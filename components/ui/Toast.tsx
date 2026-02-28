'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAnalysisStore } from '@/store/useAnalysisStore';

const toastStyles = {
  error: 'border-red-200 bg-red-50 text-red-700',
  success: 'border-green-200 bg-green-50 text-green-700',
  info: 'border-blue-200 bg-blue-50 text-blue-700',
};

export default function Toast() {
  const { showToast, clearToast } = useAnalysisStore();

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className={`fixed bottom-20 left-1/2 z-50 rounded-lg border px-4 py-2 text-sm shadow-lg ${toastStyles[showToast.type]}`}
        >
          <div className="flex items-center gap-2">
            <span>{showToast.message}</span>
            <button
              onClick={clearToast}
              className="ml-2 opacity-60 transition-opacity hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
