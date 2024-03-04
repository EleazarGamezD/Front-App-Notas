import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private isDark = false;

  constructor(
    rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    const theme = this.isDark ? 'theme-alternate' : 'theme-primary';
    this.renderer.setAttribute(document.body, 'class', theme);
  }

  isDarkTheme() {
    return this.isDark;
  }
}
