import {TokenType as tt} from "../../sucrase-babylon/tokenizer/types";
import NameManager from "../NameManager";
import TokenProcessor from "../TokenProcessor";
import Transformer from "./Transformer";

export default class OptionalCatchBindingTransformer extends Transformer {
  constructor(readonly tokens: TokenProcessor, readonly nameManager: NameManager) {
    super();
  }

  process(): boolean {
    if (this.tokens.matches2(tt._catch, tt.braceL)) {
      this.tokens.copyToken();
      this.tokens.appendCode(` (${this.nameManager.claimFreeName("e")})`);
      return true;
    }
    return false;
  }
}
