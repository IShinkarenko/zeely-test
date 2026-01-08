export type BackgroundStatus = 'idle' | 'generating' | 'success' | 'error';

export interface Background {
  id: string;
  imageUrl: string;
  isDefault: boolean;
  createdAt: Date;
}

export interface BackgroundGenerationState {
  status: BackgroundStatus;
  progress: number;
  timeRemaining: string;
  backgrounds: Background[];
  selectedBackgroundId: string | null;
  prompt: string;
}
