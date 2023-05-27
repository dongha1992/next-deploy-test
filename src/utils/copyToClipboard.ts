export const copyToClipboard = async (text: string) => {
  const clipboard = window.navigator.clipboard;
  if (!clipboard) {
    alert("복사를 지원하지 않는 브라우저 입니다.");
  }
  alert("복사기 완료되었습니다.");
  return clipboard.writeText(text);
};
