import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGuestBookMessages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["guestbook"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGuestBookMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGuestBookMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      message,
      from,
    }: { message: string; from: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addGuestBookMessage(message, from);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guestbook"] });
    },
  });
}

export function useSubmitRSVP() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      attending,
      inviteCode,
    }: {
      name: string;
      attending: boolean;
      inviteCode: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitRSVP(name, attending, inviteCode);
    },
  });
}

export function useSubmitRSVPWithEmail() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      attending,
    }: {
      name: string;
      email: string;
      attending: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitRSVPWithEmail(name, email, attending);
    },
  });
}

export function useMemories() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["memories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMemories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMemory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      imageUrl,
      title,
      description,
    }: {
      imageUrl: string;
      title: string;
      description: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const { ExternalBlob } = await import("../backend");
      const blob = ExternalBlob.fromURL(imageUrl);
      return actor.addMemory(blob, title, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memories"] });
    },
  });
}
