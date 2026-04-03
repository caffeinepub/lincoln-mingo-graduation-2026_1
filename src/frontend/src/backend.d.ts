import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface MemoryMetadata {
    title: string;
    description: string;
    image: ExternalBlob;
}
export interface InviteCode {
    created: Time;
    code: string;
    used: boolean;
}
export type Time = bigint;
export interface GuestBookMessage {
    from: string;
    message: string;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
}
export interface RSVP {
    name: string;
    inviteCode: string;
    timestamp: Time;
    attending: boolean;
}
export interface RSVPEntry {
    name: string;
    email: string;
    attending: boolean;
    timestamp: Time;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGuestBookMessage(message: string, from: string): Promise<void>;
    addMemory(image: ExternalBlob, title: string, description: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    generateInviteCode(): Promise<string>;
    getAllGuestBookMessages(): Promise<Array<GuestBookMessage>>;
    getAllMemories(): Promise<Array<MemoryMetadata>>;
    getAllRSVPs(): Promise<Array<RSVP>>;
    getAllRSVPEntries(): Promise<Array<RSVPEntry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInviteCodes(): Promise<Array<InviteCode>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isAdminAssigned(): Promise<boolean>;
    registerAdminBySecret(secret: string): Promise<boolean>;
    claimFirstAdmin(): Promise<void>;
    getAllRSVPEntriesWithPin(pin: string): Promise<Array<RSVPEntry>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitRSVP(name: string, attending: boolean, inviteCode: string): Promise<void>;
    submitRSVPWithEmail(name: string, email: string, attending: boolean): Promise<void>;
    updatePhoto(): Promise<void>;
}
