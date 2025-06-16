import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext"; // assumes this is in the same `hooks` folder

export type Memory = {
  id: number;
  image_url: string;
  tags: string;
};

type APIContextType = {
  memories: Memory[];
  allTags: Set<string>;
  fetchByTags: (queryTags: string[]) => Promise<Memory[]>;
  fetchByIds: (ids: number[]) => Promise<Memory[]>;
};

const APIContext = createContext<APIContextType | undefined>(undefined);

export const APIProvider = ({ children }: { children: ReactNode }) => {
  const { user, supabase } = useAuth();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [allTags, setAllTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
  
    const fetchMemories = async () => {
      const { data, error } = await supabase.from("memories").select("*");
      if (error) {
        console.error("Error fetching memories:", error);
        return;
      }
      setMemories(data as Memory[]);
  
      const tags = new Set<string>();
      for (const row of data ?? []) {
        row.tags.split(",").forEach((tag: string) => tags.add(tag.trim()));
      }
      setAllTags(tags);
    };
  
    fetchMemories();
  }, [user, supabase]);

  const fetchByTags = async (queryTags: string[]): Promise<Memory[]> => {
    if (queryTags.length === 0) return [];

    const tagConditions = queryTags.map((tag) => `tags.ilike.%${tag}%`).join(',');

    const { data, error } = await supabase
      .from("memories")
      .select("*")
      .or(tagConditions);

    if (error) {
      console.error("Error filtering memories:", error);
      return [];
    }

    return (data as Memory[]).filter((memory) => {
      const memoryTags = memory.tags.split(",").map((tag) => tag.trim());
      return queryTags.every((tag) => memoryTags.includes(tag));
    });
  };

  const fetchByIds = async (ids: number[]): Promise<Memory[]> => {
    if (ids.length === 0) return [];

    const { data, error } = await supabase
      .from("memories")
      .select("*")
      .in("id", ids);

    if (error) {
      console.error("Error fetching memories by ids:", error);
      return [];
    }

    return data as Memory[];
  };

  return (
    <APIContext.Provider value={{ memories, allTags, fetchByTags, fetchByIds }}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = (): APIContextType => {
  const context = useContext(APIContext);
  if (!context) throw new Error("useAPI must be used within a APIProvider");
  return context;
};