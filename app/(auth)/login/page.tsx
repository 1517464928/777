"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("密码错误");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf7f4] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold text-[#1a1a1a] mb-6">管理员登录</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="请输入密码"
          className="w-full px-4 py-3 rounded-lg border border-[#1a1a1a]/10 focus:border-[#f97316] focus:outline-none mb-4 text-sm"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-[#f97316] text-white rounded-lg font-medium hover:bg-[#ea580c] transition-colors cursor-pointer"
        >
          登录
        </button>
      </form>
    </div>
  );
}
