"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { api } from "@/app/lib/api";
import logo from "@/app/assets/images/logo/logo.svg";
import eyeVisible from "@/app/assets/images/icons/eye-visible.svg";
import eyeInvisible from "@/app/assets/images/icons/eye-invisible.svg";
import googleLogo from "@/app/assets/images/social/google-logo.png";
import kakaoLogo from "@/app/assets/images/social/kakao-logo.png";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getErrorMessage = (error) => {
  const serverMessage = error.response?.data?.message;

  if (serverMessage) {
    return serverMessage;
  }

  return "로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.";
};

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.replace("/items");
    }
  }, [router]);

  const errors = useMemo(() => {
    return {
      email:
        email.length > 0 && !EMAIL_REGEX.test(email)
          ? "잘못된 이메일입니다"
          : "",
      password:
        password.length > 0 && password.length < 8
          ? "비밀번호는 8자 이상 입력해 주세요."
          : "",
    };
  }, [email, password]);

  const isFormValid = email.length > 0 && password.length >= 8 && !errors.email;

  const signInMutation = useMutation({
    mutationFn: async (signInData) => {
      const response = await api.post("/auth/signIn", signInData);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      window.dispatchEvent(new Event("auth-change"));
      router.replace("/items");
    },
    onError: (error) => {
      setFormError(getErrorMessage(error));
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({
      email: true,
      password: true,
    });
    setFormError("");

    if (!isFormValid) {
      return;
    }

    signInMutation.mutate({
      email,
      password,
    });
  };

  const handleCloseError = () => {
    setFormError("");
  };

  return (
    <div className="flex min-h-[calc(100vh-220px)] items-center justify-center py-6">
      <section className="w-full max-w-[640px]">
        <div className="mb-10 flex justify-center">
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src={logo}
              alt="판다마켓 로고"
              width={396}
              height={132}
              className="h-auto w-[220px] md:w-[396px]"
              priority
            />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-lg font-bold text-[#1F2937]">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() =>
                setTouched((prevTouched) => ({
                  ...prevTouched,
                  email: true,
                }))
              }
              placeholder="이메일을 입력해 주세요"
              className="h-14 rounded-xl bg-[#F3F4F6] px-6 text-base text-[#111827] outline-none ring-1 ring-transparent transition focus:ring-[#3692FF]"
              aria-invalid={touched.email && Boolean(errors.email)}
              aria-describedby="email-error"
            />
            {touched.email && errors.email && (
              <p id="email-error" className="text-sm font-medium text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="password"
              className="text-lg font-bold text-[#1F2937]"
            >
              비밀번호
            </label>
            <div className="relative">
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={() =>
                  setTouched((prevTouched) => ({
                    ...prevTouched,
                    password: true,
                  }))
                }
                placeholder="비밀번호를 입력해 주세요"
                className="h-14 w-full rounded-xl bg-[#F3F4F6] px-6 pr-14 text-base text-[#111827] outline-none ring-1 ring-transparent transition focus:ring-[#3692FF]"
                aria-invalid={touched.password && Boolean(errors.password)}
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={() =>
                  setIsPasswordVisible(
                    (prevIsPasswordVisible) => !prevIsPasswordVisible,
                  )
                }
                className="absolute right-5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center"
                aria-label={
                  isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"
                }
              >
                <Image
                  src={isPasswordVisible ? eyeVisible : eyeInvisible}
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {touched.password && errors.password && (
              <p
                id="password-error"
                className="text-sm font-medium text-red-500"
              >
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={signInMutation.isPending}
            className="mt-2 h-14 rounded-full bg-[#3692FF] text-lg font-semibold text-white transition-colors hover:bg-[#1967D6] disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
          >
            {signInMutation.isPending ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-6 flex h-[74px] items-center justify-between rounded-lg bg-[#E6F2FF] px-6">
          <span className="text-base font-medium text-[#1F2937]">
            간편 로그인하기
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80"
              aria-label="구글로 로그인"
            >
              <Image
                src={googleLogo}
                alt=""
                width={42}
                height={42}
                className="h-[42px] w-[42px] object-contain"
              />
            </button>
            <button
              type="button"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#FEE500] transition-opacity hover:opacity-80"
              aria-label="카카오로 로그인"
            >
              <Image
                src={kakaoLogo}
                alt=""
                width={42}
                height={42}
                className="h-[42px] w-[42px] object-contain"
              />
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-base text-[#1F2937]">
          판다마켓이 처음이신가요?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#3692FF] underline underline-offset-2"
          >
            회원가입
          </Link>
        </p>
      </section>

      {formError && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="signin-error-title"
        >
          <div className="w-full max-w-[360px] rounded-lg bg-white px-6 py-7 text-center shadow-xl">
            <h2
              id="signin-error-title"
              className="text-lg font-bold text-[#111827]"
            >
              로그인 실패
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#4B5563]">{formError}</p>
            <button
              type="button"
              onClick={handleCloseError}
              className="mt-6 h-12 w-full rounded-lg bg-[#3692FF] text-base font-semibold text-white transition-colors hover:bg-[#1967D6]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
