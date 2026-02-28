'use client';

import { useRef } from 'react';
import { useAnalysisStore } from '@/store/useAnalysisStore';

export default function PhotoUpload() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { customImage, setCustomImage } = useAnalysisStore();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result;
            if (typeof result === 'string') {
                setCustomImage(result);
            }
        };
        reader.readAsDataURL(file);

        // Reset input so re-selecting same file triggers change
        e.target.value = '';
    };

    return (
        <div className="flex items-center gap-2">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="photo-upload-input"
            />

            <button
                onClick={() => inputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:from-blue-600 hover:to-indigo-700 hover:shadow-md active:scale-[0.97]"
                id="photo-upload-button"
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Fotoğraf Yükle
            </button>

            {customImage && (
                <button
                    onClick={() => setCustomImage(null)}
                    className="flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition-all duration-200 hover:bg-red-100 active:scale-[0.97]"
                    id="photo-remove-button"
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Kaldır
                </button>
            )}
        </div>
    );
}
