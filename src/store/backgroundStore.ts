import { create } from 'zustand';
import type { Background, BackgroundGenerationState, BackgroundStatus } from '../types';

interface BackgroundStore extends BackgroundGenerationState {
  promptHistory: string[];
  historyIndex: number;
  setStatus: (status: BackgroundStatus) => void;
  setProgress: (progress: number) => void;
  setTimeRemaining: (time: string) => void;
  setPrompt: (prompt: string) => void;
  addBackground: (background: Background) => void;
  selectBackground: (id: string) => void;
  generateBackground: () => void;
  regeneratePrompt: () => void;
  undoPrompt: () => void;
  redoPrompt: () => void;
}

const DEFAULT_PROMPT =
  'Animate glowing rays pulsating from behind the bottle, leaves gently swaying, and golden sparkles floating upward for a natural, radiant effect.';

const MOCK_BACKGROUNDS: Background[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/seed/bg1/400/600',
    isDefault: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/seed/bg2/400/600',
    isDefault: false,
    createdAt: new Date(),
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/seed/bg3/400/600',
    isDefault: false,
    createdAt: new Date(),
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/seed/bg4/400/600',
    isDefault: false,
    createdAt: new Date(),
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/seed/bg5/400/600',
    isDefault: false,
    createdAt: new Date(),
  },
  {
    id: '6',
    imageUrl: 'https://picsum.photos/seed/bg6/400/600',
    isDefault: false,
    createdAt: new Date(),
  },
];

export const useBackgroundStore = create<BackgroundStore>((set) => ({
  status: 'idle',
  progress: 0,
  timeRemaining: '',
  backgrounds: MOCK_BACKGROUNDS,
  selectedBackgroundId: '1',
  prompt: DEFAULT_PROMPT,
  promptHistory: [DEFAULT_PROMPT],
  historyIndex: 0,

  setStatus: (status) => set({ status }),

  setProgress: (progress) => set({ progress }),

  setTimeRemaining: (time) => set({ timeRemaining: time }),

  setPrompt: (prompt) =>
    set((state) => ({
      prompt,
      promptHistory: [...state.promptHistory.slice(0, state.historyIndex + 1), prompt],
      historyIndex: state.historyIndex + 1,
    })),

  addBackground: (background) =>
    set((state) => ({
      backgrounds: [background, ...state.backgrounds],
      selectedBackgroundId: background.id,
    })),

  selectBackground: (id) => set({ selectedBackgroundId: id }),

  generateBackground: () => {
    set({ status: 'generating', progress: 0, timeRemaining: '1 minute left' });

    // Simulate progress
    const progressInterval = setInterval(() => {
      set((state) => {
        const newProgress = state.progress + 5;
        if (newProgress >= 100) {
          clearInterval(progressInterval);

          // Add new background
          const newBg: Background = {
            id: Date.now().toString(),
            imageUrl: `https://picsum.photos/seed/bg${Date.now()}/400/600`,
            isDefault: false,
            createdAt: new Date(),
          };

          return {
            progress: 100,
            status: 'success',
            backgrounds: [newBg, ...state.backgrounds],
            selectedBackgroundId: newBg.id,
            timeRemaining: '',
          };
        }

        const secondsLeft = Math.ceil(((100 - newProgress) / 100) * 60);
        return {
          progress: newProgress,
          timeRemaining: `${secondsLeft} seconds left`,
        };
      });
    }, 300);

    // Reset status after success
    setTimeout(() => {
      set({ status: 'idle' });
    }, 3500);
  },

  regeneratePrompt: () => {
    set((state) => {
      const prompts = [
        DEFAULT_PROMPT,
        'Soft bokeh lights drifting in the background, subtle fog rolling in, with warm rays casting through from the side for an elegant, dreamy aesthetic.',
        'Dynamic light beams shooting across the scene, particles swirling in a vortex, and lens flares appearing intermittently for a bold, energetic vibe.',
        'Gentle rain droplets falling with slow-motion ripples, misty atmosphere with diffused lighting, and soft reflections on surfaces for a calm, serene mood.',
      ];
      const availablePrompts = prompts.filter((p) => p !== state.prompt);
      const newPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
      return {
        prompt: newPrompt,
        promptHistory: [...state.promptHistory.slice(0, state.historyIndex + 1), newPrompt],
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  undoPrompt: () => {
    set((state) => {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return {
          historyIndex: newIndex,
          prompt: state.promptHistory[newIndex],
        };
      }
      return state;
    });
  },

  redoPrompt: () => {
    set((state) => {
      if (state.historyIndex < state.promptHistory.length - 1) {
        const newIndex = state.historyIndex + 1;
        return {
          historyIndex: newIndex,
          prompt: state.promptHistory[newIndex],
        };
      }
      return state;
    });
  },
}));
