import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface CheckinState {
  // 用户签到信息
  attendeeName: string | null;
  orderId: number | null;

  // 操作方法
  setCheckinInfo: (name: string, orderId: number) => void;
  clearCheckin: () => void;
  isCheckedIn: () => boolean;
}

export const useCheckinStore = create<CheckinState>()(
  persist(
    immer((set, get) => ({
      attendeeName: null,
      orderId: null,

      setCheckinInfo: (name: string, orderId: number) => {
        set((state) => {
          state.attendeeName = name;
          state.orderId = orderId;
        });
      },

      clearCheckin: () => {
        set((state) => {
          state.attendeeName = null;
          state.orderId = null;
        });
      },

      isCheckedIn: () => {
        const state = get();
        return !!(state.attendeeName && state.orderId);
      },
    })),
    {
      name: 'checkin-storage',
      // 持久化存储用户签到信息
      partialize: state => ({
        attendeeName: state.attendeeName,
        orderId: state.orderId,
      }),
    },
  ),
);
