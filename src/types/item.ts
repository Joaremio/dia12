export interface WishItem {
  id: number;
  title: string;
  completed: boolean;
  completedDate?: string;
  emoji: string;
}

export interface WishRequest {
  title: string;
  emoji: string;
}
