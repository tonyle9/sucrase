export default class TokenProcessor {
  private resultCode: string = '';
  private tokenIndex = 0;

  constructor(readonly code: string, readonly tokens: Array<any>) {
  }

  reset() {
    this.resultCode = '';
    this.tokenIndex = 0;
  }

  matchesAtIndex(index: number, tagLabels: Array<string>): boolean {
    for (let i = 0; i < tagLabels.length; i++) {
      if (index + i >= this.tokens.length) {
        return false;
      }
      if (this.tokens[index + i].type.label !== tagLabels[i]) {
        return false;
      }
    }
    return true;
  }

  matches(tagLabels: Array<string>): boolean {
    return this.matchesAtIndex(this.tokenIndex, tagLabels);
  }

  replaceToken(newCode: string) {
    this.resultCode += this.code.slice(
      this.tokenIndex > 0
        ? this.tokens[this.tokenIndex - 1].end
        : 0,
      this.tokens[this.tokenIndex].start);
    this.resultCode += newCode;
    this.tokenIndex++;
  }

  copyToken() {
    this.resultCode += this.code.slice(
      this.tokenIndex > 0
        ? this.tokens[this.tokenIndex - 1].end
        : 0,
      this.tokens[this.tokenIndex].end);
    this.tokenIndex++;
  }

  appendCode(code: string) {
    this.resultCode += code;
  }

  currentToken(): any {
    return this.tokens[this.tokenIndex];
  }

  currentIndex(): number {
    return this.tokenIndex;
  }

  finish() {
    if (this.tokenIndex !== this.tokens.length) {
      throw new Error('Tried to finish processing tokens before reaching the end.');
    }
    this.resultCode += this.code.slice(this.tokens[this.tokens.length - 1].end);
    return this.resultCode;
  }

  isAtEnd() {
    return this.tokenIndex === this.tokens.length;
  }
}