"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import BackgroundLogo from "@/components/background-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import axiosInstance from "@/lib/axios-instance";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type VerificationStatus = "loading" | "success" | "error" | "invalid-token";

function VerifyEmail() {
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("invalid-token");
        toast.error("Geçersiz veya süresi dolmuş doğrulama bağlantısı");
        return;
      }

      // API isteği simülasyonu - gerçek istek için aşağıdaki kodları kullanın:
      /*
      try {
        const response = await axiosInstance.get(
          `/auth/verify-email?token=${token}`
        );

        if (response.status === 200) {
          setStatus("success");
          toast.success("E-posta adresiniz başarıyla doğrulandı!");
          
          // 3 saniye sonra login sayfasına yönlendir
          setTimeout(() => {
            setIsRedirecting(true);
            toast.info("Giriş sayfasına yönlendiriliyorsunuz...");
            setTimeout(() => {
              router.push("/login");
            }, 1500);
          }, 3000);
        }
      } catch (error: any) {
        console.error("Email verification error:", error);
        
        if (error.response?.status === 400) {
          setStatus("invalid-token");
          toast.error("Geçersiz veya süresi dolmuş doğrulama bağlantısı");
        } else {
          setStatus("error");
          toast.error("Doğrulama sırasında bir hata oluştu");
        }
      }
      */

      // Şimdilik demo amaçlı 2 saniye bekleyip başarılı olarak işaretle
      setTimeout(() => {
        setStatus("success");
        toast.success("E-posta adresiniz başarıyla doğrulandı!");

        // 3 saniye sonra login sayfasına yönlendir
        setTimeout(() => {
          setIsRedirecting(true);
          toast.info("Giriş sayfasına yönlendiriliyorsunuz...");
          setTimeout(() => {
            // router.push("/login"); // Gerçek yönlendirme için bu satırı aktif edin
            console.log("Login sayfasına yönlendirilecek");
          }, 1500);
        }, 3000);
      }, 2000);
    };

    verifyEmail();
  }, [token, router]);

  const handleGoToLogin = () => {
    setIsRedirecting(true);
    toast.info("Giriş sayfasına yönlendiriliyorsunuz...");
    setTimeout(() => {
      // router.push("/login"); // Gerçek yönlendirme için bu satırı aktif edin
      console.log("Login sayfasına yönlendirilecek");
    }, 1000);
  };

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-16 w-16 animate-spin text-blue-500" />;
      case "success":
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case "error":
      case "invalid-token":
        return <XCircle className="h-16 w-16 text-red-500" />;
      default:
        return <Loader2 className="h-16 w-16 animate-spin text-blue-500" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "loading":
        return "E-posta adresiniz doğrulanıyor...";
      case "success":
        return isRedirecting
          ? "Giriş sayfasına yönlendiriliyorsunuz..."
          : "E-posta adresiniz başarıyla doğrulandı!";
      case "invalid-token":
        return "Geçersiz veya süresi dolmuş doğrulama bağlantısı";
      case "error":
        return "E-posta doğrulama başarısız oldu";
      default:
        return "E-posta adresiniz doğrulanıyor...";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "loading":
        return "text-blue-600";
      case "success":
        return "text-green-600";
      case "error":
      case "invalid-token":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center">
      {/* Background Logo Component */}
      <BackgroundLogo />

      {/* Verification Card */}
      <Card className="w-full max-w-lg bg-gradient-to-br from-gray-900/80 to-black/80 border-white/20 text-white">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            E-posta Doğrulama
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* Status Icon */}
          <div className="flex justify-center">{getStatusIcon()}</div>

          {/* Status Message */}
          <div className="space-y-2">
            <p className={`text-lg font-medium ${getStatusColor()}`}>
              {getStatusMessage()}
            </p>
          </div>

          {/* Action Buttons */}
          {(status === "error" || status === "invalid-token") && (
            <div className="pt-4">
              <Button
                onClick={handleGoToLogin}
                disabled={isRedirecting}
                className="w-full bg-gradient-to-r from-[#FB7C3E] to-[#9141E4] hover:from-[#e66a2b] hover:to-[#7c37c7] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
              >
                {isRedirecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Giriş sayfasına yönlendiriliyorsunuz...
                  </>
                ) : (
                  "Giriş Sayfasına Git"
                )}
              </Button>
            </div>
          )}

          {status === "success" && !isRedirecting && (
            <div className="pt-4">
              <Button
                onClick={handleGoToLogin}
                className="w-full bg-gradient-to-r from-[#FB7C3E] to-[#9141E4] hover:from-[#e66a2b] hover:to-[#7c37c7] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
              >
                Giriş Sayfasına Git
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default VerifyEmail;
