import { Media } from "../Media"
import Dom from "../../dom/Dom"
import { Language } from "../../language/Language"
import { Browser } from "../../core/Browser"

/*	Media.Image
	Produces image assets.
	Takes a data object and populates a dom object
================================================== */

export default class Image extends Media {
	
	/*	Load the media
	================================================== */
	_loadMedia() {
		var self = this;
		// Loading Message
		this.message.updateMessage(Language.messages.loading + " " + this.options.media_name);
		
		// Link
		if (this.data.link) {
			this._el.content_link 				= Dom.create("a", "", this._el.content);
			this._el.content_link.href 			= this.data.link;
			this._el.content_link.target 		= "_blank";
			this._el.content_item				= Dom.create("img", "vco-media-item vco-media-image vco-media-shadow", this._el.content_link);

			if (this.data.link.match(/\.(jpg|jpeg|png|gif)$/i)) { // The link target is another (presumably larger) image
				// Display the content in a lightbox, rather than a new tab
				this._el.content_link.addEventListener("click", function(event) {
					event.preventDefault();
					document.getElementById('lightbox').innerHTML = `
						<a id="close"></a>
						<div class="img" style="background: url('${this.getAttribute('href')}') center center / contain no-repeat;">
							<img src="${this.getAttribute('href')}">
						</div>`;
					document.getElementById('lightbox').style.display = 'block';
				});
			}
		} else {
			this._el.content_item				= Dom.create("img", "vco-media-item vco-media-image vco-media-shadow", this._el.content);
		}
		
		// Media Loaded Event
		this._el.content_item.addEventListener('load', function(e) {
			self.onMediaLoaded();
		});
		
		this._el.content_item.src			= this.data.url;
		
		this.onLoaded();
	}
	
	_updateMediaDisplay(layout) {
		
		if(Browser.firefox) { 
			//this._el.content_item.style.maxWidth = (this.options.width/2) - 40 + "px";
			this._el.content_item.style.width = "auto";
		}
	}
	
}
