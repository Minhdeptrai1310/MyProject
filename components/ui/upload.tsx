import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { Label } from './label';
import { Input } from './input';

interface UploadResult {
    success: boolean;
    filename: string;
    local_url: string;
    minio_url: string;
}

export default function ImageUploadInput(props: { onChangeFileUrl: (value: string) => void, fileUrl: string }) {
    const { onChangeFileUrl, fileUrl } = props;
    const [imageUrl, setImageUrl] = useState<string>(fileUrl);
    const [uploading, setUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        onChangeFileUrl(imageUrl);
    }, [imageUrl])

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        uploadFile(file);
    };

    const uploadFile = async (file: File) => {
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // API call
            const response = await fetch('http://localhost:8080/upload/upload-image', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                setError('Tải ảnh thất bại!');
                throw new Error('Tải ảnh thất bại!');
            }

            const data: UploadResult = await response.json();

            setImageUrl(`http://localhost:8080${data.local_url}`);
        } catch (error) {
            console.error('Upload error:', error);
            setError('Tải ảnh bị lỗi!');
        } finally {
            setUploading(false);
        }
    };

    const handleUploadClick = (e: any) => {
        e.preventDefault();
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl">
                <Label className="mb-2">
                    URL hình ảnh
                </Label>

                {/* Input with Upload Button */}
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />

                        {/* Upload Button Inside Input */}
                        <button
                            onClick={handleUploadClick}
                            disabled={uploading}
                            className="absolute right-0 top-1/2 -translate-y-1/2 px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
                        >
                            {uploading ? (
                                <>
                                    <div className="w-2 h-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Đang tải...</span>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-2 h-2" />
                                    <span>Upload</span>
                                </>
                            )}
                        </button>

                        {/* Hidden File Input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                        Nhập URL hình ảnh hoặc upload qua backend của bạn
                    </p>
                </div>

                {/* Image Preview */}
                {imageUrl && (
                    <div className="mt-6">
                        <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="w-full h-64 object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EKhông thể tải ảnh%3C/text%3E%3C/svg%3E';
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Info */}
                <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        💡 <strong>Lưu ý:</strong> File sẽ được upload lên server và URL sẽ tự động điền vào ô input
                    </p>
                </div>
            </div>
        </div>
    );
}