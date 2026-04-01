import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Blob "mo:core/Blob";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Random "mo:core/Random";
import Array "mo:core/Array";
import Int "mo:core/Int";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import InviteLinksModule "invite-links/invite-links-module";

actor {
  include MixinStorage();

  // Initialize access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  
  // Initialize invite links
  let inviteState = InviteLinksModule.initState();

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Invite Links - Admin protected for generation and viewing
  public shared ({ caller }) func generateInviteCode() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can generate invite codes");
    };
    let blob = await Random.blob();
    let code = InviteLinksModule.generateUUID(blob);
    InviteLinksModule.generateInviteCode(inviteState, code);
    code;
  };

  // Public function - authentication via invite code
  public shared func submitRSVP(name : Text, attending : Bool, inviteCode : Text) : async () {
    InviteLinksModule.submitRSVP(inviteState, name, attending, inviteCode);
  };

  // Get all RSVPs - Admin only
  public query ({ caller }) func getAllRSVPs() : async [InviteLinksModule.RSVP] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view RSVPs");
    };
    InviteLinksModule.getAllRSVPs(inviteState);
  };

  // Get invite codes - Admin only
  public query ({ caller }) func getInviteCodes() : async [InviteLinksModule.InviteCode] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view invite codes");
    };
    InviteLinksModule.getInviteCodes(inviteState);
  };

  // === Email-based RSVP (no invite code required) ===
  public type RSVPEntry = {
    name : Text;
    email : Text;
    attending : Bool;
    timestamp : Time.Time;
  };

  var rsvpEntries = List.empty<RSVPEntry>();

  // Submit RSVP with email - public, no auth required
  public shared func submitRSVPWithEmail(name : Text, email : Text, attending : Bool) : async () {
    let entry : RSVPEntry = {
      name = name;
      email = email;
      attending = attending;
      timestamp = Time.now();
    };
    rsvpEntries.add(entry);
  };

  // Get all email RSVPs - Admin only
  public query ({ caller }) func getAllRSVPEntries() : async [RSVPEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view RSVPs");
    };
    rsvpEntries.toArray();
  };

  // Photo Gallery - Memories & Moments
  type MemoryMetadata = {
    title : Text;
    description : Text;
    image : Storage.ExternalBlob;
  };

  module MemoryMetadata {
    public func compare(m1 : MemoryMetadata, m2 : MemoryMetadata) : Order.Order {
      Text.compare(m1.title, m2.title);
    };
  };

  var memories = List.empty<MemoryMetadata>();

  // Add memory - Admin only
  public shared ({ caller }) func addMemory(image : Storage.ExternalBlob, title : Text, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add memories");
    };
    let memory : MemoryMetadata = {
      title = title;
      description = description;
      image = image;
    };
    memories.add(memory);
  };

  // Get all memories - Public
  public query func getAllMemories() : async [MemoryMetadata] {
    let arr = memories.toArray();
    arr.sort();
  };

  // Update photo - Admin only
  public shared ({ caller }) func updatePhoto() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update photos");
    };
    // Update logic placeholder
  };

  // Guest Book - Public messages
  type GuestBookMessage = {
    from : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module GuestBookMessage {
    public func compare(msg1 : GuestBookMessage, msg2 : GuestBookMessage) : Order.Order {
      Int.compare(msg2.timestamp, msg1.timestamp); // Most recent first
    };
  };

  var guestBookMessages = List.empty<GuestBookMessage>();

  // Add guest book message - Public (no authentication required)
  public shared func addGuestBookMessage(message : Text, from : Text) : async () {
    let entry : GuestBookMessage = {
      message;
      from;
      timestamp = Time.now();
    };
    guestBookMessages.add(entry);
  };

  // Get all guest book messages - Public
  public query func getAllGuestBookMessages() : async [GuestBookMessage] {
    let arr = guestBookMessages.toArray();
    arr.sort();
  };

  // Claim first admin - no token needed, first logged-in caller becomes admin permanently
  public shared ({ caller }) func claimFirstAdmin() : async () {
    AccessControl.claimFirstAdmin(accessControlState, caller);
  };

  // Check if admin has been assigned yet
  public query func isAdminAssigned() : async Bool {
    AccessControl.isAdminAssigned(accessControlState);
  };
};
