import { Media } from "../Media"
import Dom from "../../dom/Dom"

export default class Video extends Media {
	_loadMedia() {
		var self = this;

		this._el.content_item				= Dom.create("video", "vco-media-item vco-media-shadow", this._el.content);

		// Media Loaded Event
		this._el.content_item.addEventListener('load', function(e) {
			self.onMediaLoaded();
		});

		this._el.content_item.src			= this.data.url;

		this._el.content_item.setAttribute('controls', '');

		this.onLoaded();
	}
}
