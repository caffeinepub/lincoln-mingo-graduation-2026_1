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

  // Kept for stable variable compatibility
  let adminPin : Text = "REDOAK2026";

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

  // Invite Links
  public shared ({ caller }) func generateInviteCode() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can generate invite codes");
    };
    let blob = await Random.blob();
    let code = InviteLinksModule.generateUUID(blob);
    InviteLinksModule.generateInviteCode(inviteState, code);
    code;
  };

  public shared func submitRSVP(name : Text, attending : Bool, inviteCode : Text) : async () {
    InviteLinksModule.submitRSVP(inviteState, name, attending, inviteCode);
  };

  public query ({ caller }) func getAllRSVPs() : async [InviteLinksModule.RSVP] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view RSVPs");
    };
    InviteLinksModule.getAllRSVPs(inviteState);
  };

  public query ({ caller }) func getInviteCodes() : async [InviteLinksModule.InviteCode] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view invite codes");
    };
    InviteLinksModule.getInviteCodes(inviteState);
  };

  // === Email-based RSVP ===
  public type RSVPEntry = {
    name : Text;
    email : Text;
    attending : Bool;
    timestamp : Time.Time;
  };

  var rsvpEntries = List.empty<RSVPEntry>();

  public shared func submitRSVPWithEmail(name : Text, email : Text, attending : Bool) : async () {
    let entry : RSVPEntry = {
      name = name;
      email = email;
      attending = attending;
      timestamp = Time.now();
    };
    rsvpEntries.add(entry);
  };

  public query ({ caller }) func getAllRSVPEntries() : async [RSVPEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view RSVPs");
    };
    rsvpEntries.toArray();
  };

  // Photo Gallery
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

  public query func getAllMemories() : async [MemoryMetadata] {
    let arr = memories.toArray();
    arr.sort();
  };

  public shared ({ caller }) func updatePhoto() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update photos");
    };
  };

  // Guest Book
  type GuestBookMessage = {
    from : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module GuestBookMessage {
    public func compare(msg1 : GuestBookMessage, msg2 : GuestBookMessage) : Order.Order {
      Int.compare(msg2.timestamp, msg1.timestamp);
    };
  };

  var guestBookMessages = List.empty<GuestBookMessage>();

  public shared func addGuestBookMessage(message : Text, from : Text) : async () {
    let entry : GuestBookMessage = {
      message;
      from;
      timestamp = Time.now();
    };
    guestBookMessages.add(entry);
  };

  public query func getAllGuestBookMessages() : async [GuestBookMessage] {
    let arr = guestBookMessages.toArray();
    arr.sort();
  };

  // Check if admin has been assigned
  public query func isAdminAssigned() : async Bool {
    accessControlState.adminAssigned;
  };

  // Register caller as admin using a secret passphrase.
  // Only works if no admin has been assigned yet.
  // Secret is hardcoded server-side — never visible to guests.
  public shared ({ caller }) func registerAdminBySecret(secret : Text) : async Bool {
    if (caller.isAnonymous()) {
      return false;
    };
    if (accessControlState.adminAssigned) {
      // Already have an admin — check if THIS caller is already admin
      return AccessControl.isAdmin(accessControlState, caller);
    };
    if (secret == "MINGO2026ADMIN") {
      accessControlState.userRoles.add(caller, #admin);
      accessControlState.adminAssigned := true;
      return true;
    };
    return false;
  };

  // Kept for ABI compatibility — now a no-op
  public shared ({ caller }) func claimFirstAdmin() : async () {
    // Deprecated: use registerAdminBySecret instead
  };

  // Legacy PIN function - kept for API compatibility
  public query ({ caller }) func getAllRSVPEntriesWithPin(pin : Text) : async [RSVPEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view RSVPs");
    };
    rsvpEntries.toArray();
  };
};
