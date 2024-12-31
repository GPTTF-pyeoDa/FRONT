// 클래스 이름을 조건에 따라 결합하는 유틸리티 함수
export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
