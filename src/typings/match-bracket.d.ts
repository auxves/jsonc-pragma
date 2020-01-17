declare module "match-bracket" {
  type pos = {
    line: number;
    cursor: number;
  };

  const exported: (code: string, bracketPos: pos) => pos;

  export default exported;
}
