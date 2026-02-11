"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import {
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    Youtube as YoutubeIcon,
    Heading1,
    Heading2,
    Heading3,
    FileCode,
    Video
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const MenuBar = ({
    editor,
    showCode,
    setShowCode,
    onUpload,
    uploading
}: {
    editor: Editor | null,
    showCode: boolean,
    setShowCode: (v: boolean) => void,
    onUpload: (type: 'image' | 'video') => void,
    uploading: boolean
}) => {
    const addLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("Enter URL", previousUrl);

        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }, [editor]);

    const addYoutube = useCallback(() => {
        const url = window.prompt("Enter YouTube URL");
        if (url && editor) {
            editor.chain().focus().setYoutubeVideo({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className={`border border-gray-200 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1 ${showCode ? "opacity-50 pointer-events-none" : ""}`}>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive("bold") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                title="Bold"
            >
                <Bold size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive("italic") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                title="Italic"
            >
                <Italic size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive("strike") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                title="Strike"
            >
                <Strikethrough size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200 text-black" : "text-gray-600"}`}
                title="Heading 1"
            >
                <Heading1 size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200 text-black" : "text-gray-600"}`}
                title="Heading 2"
            >
                <Heading2 size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200 text-black" : "text-gray-600"}`}
                title="Heading 3"
            >
                <Heading3 size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive("bulletList") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                title="Bullet List"
            >
                <List size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive("orderedList") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                title="Ordered List"
            >
                <ListOrdered size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${showCode ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                title="Toggle HTML Source"
            >
                <FileCode size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            <button
                type="button"
                onClick={addLink}
                className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive("link") ? "bg-gray-200 text-black" : "text-gray-600"}`}
                title="Link"
            >
                <LinkIcon size={18} />
            </button>
            <button
                type="button"
                onClick={() => onUpload('image')}
                className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"
                title="Upload Image"
            >
                <ImageIcon size={18} />
            </button>
            <button
                type="button"
                onClick={() => onUpload('video')}
                className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"
                title="Upload Video"
            >
                <Video size={18} />
            </button>
            <button
                type="button"
                onClick={addYoutube}
                className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600"
                title="Link YouTube Video"
            >
                <YoutubeIcon size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-50"
                title="Undo"
            >
                <Undo size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-50"
                title="Redo"
            >
                <Redo size={18} />
            </button>

            {uploading && (
                <div className="flex items-center ml-2 text-xs text-blue-600 animate-pulse">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Uploading...
                </div>
            )}
        </div>
    );
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const [showCode, setShowCode] = useState(false);
    const [uploading, setUploading] = useState(false);

    const uploadFile = async (file: File, type: 'image' | 'video') => {
        if (!editor || !storage) {
            console.error('Editor or Storage not initialized');
            return;
        }

        setUploading(true);
        console.log(`Starting upload for ${type}:`, file.name);

        try {
            const storageRef = ref(storage, `blog-editor/${Date.now()}-${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            console.log('Upload success! URL:', url);

            if (type === 'image') {
                editor.chain().focus().setImage({ src: url }).run();
            } else {
                editor.chain().focus().setYoutubeVideo({ src: url }).run();
            }
        } catch (error: unknown) {
            setUploading(false); // Reset state before alert
            console.error('Upload Error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert(`Upload failed: ${errorMessage}`);
        } finally {
            setUploading(false);
        }
    };

    const handleFileUpload = (type: 'image' | 'video') => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = type === 'image' ? 'image/*' : 'video/*';
        input.onchange = async (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) await uploadFile(file, type);
        };
        input.click();
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[#FF8A00] underline',
                },
            }),
            Youtube.configure({
                controls: true,
                allowFullscreen: true,
                nocookie: true,
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: "prose prose-lg max-w-none focus:outline-none text-gray-900 min-h-[400px] p-4",
            },
            handlePaste: (_view, event) => {
                const items = Array.from(event.clipboardData?.items || []);
                const imageItems = items.filter(item => item.type.startsWith('image/'));

                if (imageItems.length > 0) {
                    event.preventDefault();
                    imageItems.forEach(async item => {
                        const file = item.getAsFile();
                        if (file) await uploadFile(file, 'image');
                    });
                    return true;
                }
                return false;
            },
            handleDrop: (_view, event) => {
                const files = Array.from(event.dataTransfer?.files || []);
                const imageFiles = files.filter(file => file.type.startsWith('image/'));

                if (imageFiles.length > 0) {
                    event.preventDefault();
                    imageFiles.forEach(async file => {
                        await uploadFile(file, 'image');
                    });
                    return true;
                }
                return false;
            }
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            const isFirstLoad = editor.isEmpty && value !== '';
            if (!editor.isFocused || isFirstLoad) {
                editor.commands.setContent(value);
            }
        }
    }, [value, editor]);

    return (
        <div className="bg-white rounded-lg border border-gray-300 shadow-sm flex flex-col w-full relative overflow-hidden" style={{ minHeight: '600px' }}>
            <MenuBar
                editor={editor}
                showCode={showCode}
                setShowCode={setShowCode}
                onUpload={handleFileUpload}
                uploading={uploading}
            />

            <div className="flex-1 overflow-y-auto bg-white relative">
                {showCode ? (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full h-full p-4 font-mono text-sm border-none focus:ring-0 resize-none text-gray-800 bg-gray-50 bg-opacity-50"
                        placeholder="Paste or edit HTML here..."
                        style={{ minHeight: '500px' }}
                    />
                ) : (
                    <EditorContent editor={editor} />
                )}
            </div>

            <style jsx global>{`
                .ProseMirror {
                    color: #111827 !important;
                    min-height: 400px;
                }
                .ProseMirror:focus { outline: none; }
                .ProseMirror h1 { font-size: 2.25rem; font-weight: 800; margin: 1.5rem 0 1rem; color: #111827; }
                .ProseMirror h2 { font-size: 1.875rem; font-weight: 700; margin: 1.5rem 0 1rem; color: #111827; }
                .ProseMirror h3 { font-size: 1.5rem; font-weight: 600; margin: 1.25rem 0 0.75rem; color: #111827; }
                .ProseMirror p { margin-bottom: 1.25rem; line-height: 1.75; color: #374151; }
                .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
                .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.25rem; }
                .ProseMirror li { margin-bottom: 0.5rem; }
                .ProseMirror blockquote { border-left: 4px solid #FF8A00; padding-left: 1.25rem; font-style: italic; color: #4b5563; margin: 1.5rem 0; }
                .ProseMirror img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 1rem;
                    margin: 2rem 0;
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                }
                .ProseMirror iframe {
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    border-radius: 1rem;
                    margin: 2rem 0;
                    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
                }
            `}</style>
        </div>
    );
}
