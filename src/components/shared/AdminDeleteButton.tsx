"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface Props {
  table: string;
  id: string;
  imageUrl?: string;
  onSuccess?: () => void;
  className?: string;
  redirectUrl?: string; // Add redirectUrl option
}

export default function AdminDeleteButton({ table, id, imageUrl, onSuccess, className = "", redirectUrl }: Props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsAdmin(true);
    });
  }, []);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link click if wrapped
    e.stopPropagation();

    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    // Delete image if exists
    if (imageUrl) {
      const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
      await supabase.storage.from('case_images').remove([fileName]);
    }

    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      alert("삭제 실패: " + error.message);
    } else {
      if (redirectUrl) {
        alert("삭제되었습니다.");
        router.push(redirectUrl);
      } else if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    }
  };

  if (!isAdmin) return null;

  return (
    <button 
      onClick={handleDelete}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded text-sm hover:bg-red-100 transition font-bold shadow-sm ${className}`}
      title="관리자 전용 삭제"
    >
      <Trash2 size={16} /> 삭제
    </button>
  );
}
