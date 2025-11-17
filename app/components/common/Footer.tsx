import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Image src="/next.svg" alt="PromptHub 로고" width={22} height={22} />
            <span className="text-sm font-semibold">PromptHub</span>
          </div>
          <p className="text-sm text-zinc-600">모든 AI 프롬프트의 허브.</p>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold">회사</h4>
          <ul className="space-y-1 text-sm text-zinc-600">
            <li>
              <Link href="#">팀 소개</Link>
            </li>
            <li>
              <Link href="#">문의 / 제휴</Link>
            </li>
            <li>
              <Link href="#">피드백</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold">정책</h4>
          <ul className="space-y-1 text-sm text-zinc-600">
            <li>
              <Link href="#">이용약관</Link>
            </li>
            <li>
              <Link href="#">개인정보처리방침</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold">SNS</h4>
          <ul className="space-y-1 text-sm text-zinc-600">
            <li>
              <Link href="#">X</Link>
            </li>
            <li>
              <Link href="#">Discord</Link>
            </li>
            <li>
              <Link href="#">GitHub</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-4 text-xs text-zinc-500">
        © {new Date().getFullYear()} PromptHub. All rights reserved.
      </div>
    </footer>
  );
}


