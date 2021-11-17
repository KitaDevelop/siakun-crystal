import development from "./config.development"
import production from "./config.production"

let config: any;
if (process.env.NODE_ENV === 'production') {
  config = production
} else {
  config = development
}

export default config
