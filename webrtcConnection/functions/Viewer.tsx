import {infer} from '../requests';
import {initialConnectionState} from '../store';

export async function makeInference() {
  const {token} = initialConnectionState; // Assuming connection is a state variable

  if (token) {
    let res = await infer(token);
  }
}
