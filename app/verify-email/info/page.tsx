"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  CheckCircle,
  Clock,
  RefreshCw,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import axiosInstance from "@/lib/axios-instance";
import { toast } from "sonner";
import BackgroundLogo from "@/components/background-logo";

export default function Info() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "kullanıcı@example.com";
  const [isResending, setIsResending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  //   const resendVerificationEmail = async () => {
  //     if (!email) return;

  //     setIsResending(true);
  //     try {
  //       await axiosInstance.post('/auth/resend-verification', { email });
  //       toast.success('Doğrulama e-postası tekrar gönderildi!');
  //       setEmailSent(true);
  //     } catch (error) {
  //       toast.error('E-posta gönderilirken hata oluştu');
  //     } finally {
  //       setIsResending(false);
  //     }
  //   };

  const contactSupport = () => {
    // Destek sayfasına yönlendir veya modal aç
    window.open(
      "mailto:support@soundconnect.dev?subject=E-posta Doğrulama Sorunu",
      "_blank"
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center">
      <BackgroundLogo />
      <Card className="w-full max-w-lg bg-gradient-to-br from-gray-900/80 to-black/80 border-white/20 text-white">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Hesabınız Oluşturuldu!
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Ana Mesaj */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5" />
              <span className="font-medium">E-posta Doğrulama Gerekli</span>
            </div>

            <p className="text-sm leading-relaxed">
              <strong className="text-muted-foreground">{email}</strong>{" "}
              adresine bir doğrulama e-postası gönderdik.
            </p>

            <p className="text-xs text-gray-500">
              E-posta kutunuzu kontrol edin ve gelen mesajdaki
              <strong>"Hesabımı Doğrula"</strong> linkine tıklayın.
            </p>
          </div>

          {/* İpuçları */}
          <div className="border border-white/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="text-xs space-y-1">
                <p>
                  <strong>💡 İpuçları:</strong>
                </p>
                <ul className="list-disc list-inside space-y-0.5 ml-2">
                  <li>E-posta 5-10 dakika içinde gelecektir</li>
                  <li>Spam/Gereksiz klasörünüzü de kontrol edin</li>
                  <li>E-posta gelmezse tekrar gönderebilirsiniz</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Aksiyon Butonları */}
          <div className="grid grid-cols-2 gap-3">
            {/* Tekrar Gönder */}
            <Button
              disabled={isResending || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
              size="lg"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  E-postayı Tekrar Gönder
                </>
              )}
            </Button>

            {emailSent && (
              <div className="text-center text-xs text-green-600 font-medium">
                ✅ E-posta başarıyla gönderildi!
              </div>
            )}

            {/* Destek ile İletişime Geç */}
            <Button
              onClick={contactSupport}
              variant="outline"
              className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 cursor-pointer"
              size="lg"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Destek ile İletişime Geç
            </Button>

            {/* Geri Dön */}
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="w-full text-gray-600 hover:text-gray-900 col-span-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
