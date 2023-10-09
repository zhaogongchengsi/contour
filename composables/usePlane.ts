import { RenderPlaneProps } from "~/types"

export const usePlaneData = () => {
	return inject<RenderPlaneProps>(editDataProviderKey)!
}
