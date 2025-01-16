// Copyright (c) 2022 Nathan Smith
// ===========================
// START: if "customElements".
// ===========================

if ('customElements' in window) {
  // ==========
  // Constants.
  // ==========

  const ACTIVE = 'active';
  const ANIMATED = 'animated';
  const ANIMATION_DURATION = 250;
  const ARIA_LABEL = 'aria-label';
  const BLOCK = 'block';
  const CLICK = 'click';
  const CLOSE = 'close';
  const CLOSE_TITLE = 'Close';
  const DATA_HIDE = 'data-cta-modal-hide';
  const DATA_SHOW = 'data-cta-modal-show';
  const EMPTY_STRING = '';
  const ENTER = 'enter';
  const ESCAPE = 'escape';
  const FALSE = 'false';
  const FOCUSIN = 'focusin';
  const FUNCTION = 'function';
  const HIDDEN = 'hidden';
  const KEYDOWN = 'keydown';
  const MODAL_LABEL_FALLBACK = 'modal';
  const NONE = 'none';
  const PREFERS_REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
  const SPACE = ' ';
  const SPACE_REGEX = /\s+/g;
  const STATIC = 'static';
  const TAB = 'tab';
  const TEMPLATE = 'template';
  const TRUE = 'true';

  const FOCUSABLE_SELECTORS = [
    '[contenteditable]',
    '[tabindex="0"]:not([disabled])',
    'a[href]',
    'audio[controls]',
    'button:not([disabled])',
    'iframe',
    "input:not([disabled]):not([type='hidden'])",
    'select:not([disabled])',
    'summary',
    'textarea:not([disabled])',
    'video[controls]',
  ].join(',');

  // ======
  // Style.
  // ======

  const STYLE = `
    <style>
      *,
      *:after,
      *:before {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      @media ${PREFERS_REDUCED_MOTION} {
        *,
        *:after,
        *:before {
          animation: none !important;
          transition: none !important;
        }
      }

      @keyframes SHOW-OVERLAY {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

      @keyframes SHOW-DIALOG {
        0% {
          transform: scale(0.95);
        }

        100% {
          transform: scale(1);
        }
      }

      @keyframes HIDE-OVERLAY {
        0% {
          opacity: 1;
        }

        100% {
          opacity: 0;
        }
      }

      @keyframes HIDE-DIALOG {
        0% {
          transform: scale(1);
        }

        100% {
          transform: scale(0.95);
        }
      }

      .cta-modal__focus-trap {
        opacity: 0;
        overflow: hidden;

        width: 0;
        height: 0;

        position: fixed;
        top: 0;
        left: 0;
      }

      .cta-modal__scroll {
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: none;

        width: 100%;
        height: 100%;

        z-index: var(--cta-modal-overlay-z-index, 100000);
        position: fixed;
        top: 0;
        left: 0;
      }

      .cta-modal__overlay {
        background-color: var(--cta-modal-overlay-background-color, rgba(26, 27, 27, 0.85));
        display: flex;
        align-items: end;
        justify-content: center;

        padding-top: var(--cta-modal-overlay-padding-top, 0px);
        padding-left: var(--cta-modal-overlay-padding-left, 0px);
        padding-right: var(--cta-modal-overlay-padding-right, 0px);
        padding-bottom: var(--cta-modal-overlay-padding-bottom, 0px);

        width: 100%;
        min-height: 100%;
      }

      .cta-modal__dialog {
        background-color: var(--cta-modal-dialog-background-color, #FFFFFF);
        border-radius: var(--cta-modal-dialog-border-radius, 0px);
        box-shadow: var(--cta-modal-dialog-box-shadow, 0 2px 5px 0 rgba(0, 0, 0, 0.5));

        padding-top: var(--cta-modal-dialog-padding-top, 0px);
        padding-left: var(--cta-modal-dialog-padding-left, 0px);
        padding-right: var(--cta-modal-dialog-padding-right, 0px);
        padding-bottom: var(--cta-modal-dialog-padding-bottom, 0px);

        width: var(--cta-modal-dialog-width, 100%);
        max-width: 100%;

        position: relative;
      }

      [${DATA_SHOW}='true'] .cta-modal__overlay {
        animation-duration: ${ANIMATION_DURATION}ms;
        animation-name: SHOW-OVERLAY;
      }

      [${DATA_SHOW}='true'] .cta-modal__dialog {
        animation-duration: ${ANIMATION_DURATION}ms;
        animation-name: SHOW-DIALOG;
      }

      [${DATA_HIDE}='true'] .cta-modal__overlay {
        animation-duration: ${ANIMATION_DURATION}ms;
        animation-name: HIDE-OVERLAY;
        opacity: 0;
      }

      [${DATA_HIDE}='true'] .cta-modal__dialog {
        animation-duration: ${ANIMATION_DURATION}ms;
        animation-name: HIDE-DIALOG;
        transform: scale(0.95);
      }

      .cta-modal__close {
        appearance: none;
        touch-action: none;
        user-select: none;

        border: 0;
        padding: 0;

        color: var(--cta-modal-close-color, #000000);
        background-color: var(--cta-modal-close-background-color, #fff);
        /*border-radius: var(--cta-modal-close-border-radius, 50%);*/
        box-shadow: var(--cta-modal-close-box-shadow, 0 0 0 1px #fff);
        display: var(--cta-modal-close-display, block);

        cursor: pointer;
        font-family: var(--cta-modal-close-font-family, 'Arial', sans-serif);
        font-size: var(--cta-modal-close-font-size, 23px);
        text-align: center;

        line-height: var(--cta-modal-close-line-height, 36px);
        width: var(--cta-modal-close-width, 36px);
        transition: all 150ms;

        position: absolute;
        top: 36px;
        right: 36px;
        z-index: 20;
      }

      .cta-modal__close:hover {
        color: var(--cta-modal-close-color-hover, #ffffff);
        background-color: var(--cta-modal-close-background-color-hover, #000000);
        box-shadow: var(--cta-modal-close-box-shadow-hover, 0 0 0 1px #000);
      }

      @supports selector(:focus-visible) {
        .cta-modal__close:focus-visible {
          color: var(--cta-modal-close-color-hover, #000);
          background-color: var(--cta-modal-close-background-color-hover, #fff);
          box-shadow: var(--cta-modal-close-box-shadow-hover, 0 0 0 1px #000);
        }
      }

      @supports not selector(:focus-visible) {
        .cta-modal__close:focus {
          color: var(--cta-modal-close-color-hover, #000);
          background-color: var(--cta-modal-close-background-color-hover, #fff);
          box-shadow: var(--cta-modal-close-box-shadow-hover, 0 0 0 1px #000);
        }
      }
      @media (min-width: 1024px) {
        .cta-modal__overlay {
          align-items: center;

          padding-top: var(--cta-modal-overlay-padding-top, 20px);
          padding-left: var(--cta-modal-overlay-padding-left, 20px);
          padding-right: var(--cta-modal-overlay-padding-right, 20px);
          padding-bottom: var(--cta-modal-overlay-padding-bottom, 20px);
        }

        .cta-modal__dialog {
          width: var(--cta-modal-dialog-width, 'auto');
        }
      }
    </style>
  `;

  // =========
  // Template.
  // =========

  const FOCUS_TRAP = `
    <span
      aria-hidden='true'
      class='cta-modal__focus-trap'
      tabindex='0'
    ></span>
  `;

  const MODAL = `
    <slot name='button'></slot>

    <div class='cta-modal__scroll' style='display:none'>
      ${FOCUS_TRAP}

      <div class='cta-modal__overlay'>
        <div
          aria-modal='true'
          class='cta-modal__dialog'
          role='dialog'
          tabindex='-1'
        >
          <button
            class='cta-modal__close'
            type='button'
          >&times;</button>

          <slot name='modal'></slot>
        </div>
      </div>

      ${FOCUS_TRAP}
    </div>
  `;

  // Get markup.
  const markup = [STYLE, MODAL].join(EMPTY_STRING).trim().replace(SPACE_REGEX, SPACE);

  // Get template.
  const template = document.createElement(TEMPLATE);
  template.innerHTML = markup;

  // ==========
  // Component.
  // ==========

  class CtaModal extends HTMLElement {
    // Read-only types.
    _buttonClose;
    _heading;
    _modal;
    _modalOverlay;
    _modalScroll;
    _shadow;
    _slotForButton;
    _slotForModal;

    // Normal types.
    _activeElement = null;
    _focusTrapList;
    _isActive = false;
    _isAnimated = true;
    _isHideShow = false;
    _isStatic = false;
    _timerForHide;
    _timerForShow;

    // =======================
    // Lifecycle: constructor.
    // =======================

    constructor() {
      // Parent constructor.
      super();

      // Bind context.
      this._bind();
      this.style.display = 'block';

      // Shadow DOM.
      this._shadow = this.attachShadow({ mode: 'closed' });

      // Add template.
      this._shadow.append(
        // Clone node.
        template.content.cloneNode(true)
      );

      // Get slots.
      this._slotForButton = this.querySelector("[slot='button']");
      this._slotForModal = this.querySelector("[slot='modal']");

      // Get elements.
      this._heading = this.querySelector('h1, h2, h3, h4, h5, h6');

      // Get shadow elements.
      this._buttonClose = this._shadow.querySelector('.cta-modal__close');
      this._focusTrapList = this._shadow.querySelectorAll('.cta-modal__focus-trap');
      this._modal = this._shadow.querySelector('.cta-modal__dialog');
      this._modalOverlay = this._shadow.querySelector('.cta-modal__overlay');
      this._modalScroll = this._shadow.querySelector('.cta-modal__scroll');

      // Missing slot?
      if (!this._slotForModal) {
        window.console.error('Required [slot="modal"] not found inside cta-modal.');
      }

      // Set animation flag.
      this._setAnimationFlag();

      // Set close title.
      this._setCloseTitle();

      // Set modal label.
      this._setModalLabel();

      // Set static flag.
      this._setStaticFlag();

      /*
      =====
      NOTE:
      =====

        We set this flag last, because the UI visuals within
        are contingent on some of the other flags being set.
      */

      // Set active flag.
      this._setActiveFlag();
    }

    // ============================
    // Lifecycle: watch attributes.
    // ============================

    static get observedAttributes() {
      return [ACTIVE, ANIMATED, CLOSE, STATIC];
    }

    // ==============================
    // Lifecycle: attributes changed.
    // ==============================

    attributeChangedCallback(name, oldValue, newValue) {
      // Different old/new values?
      if (oldValue !== newValue) {
        // Changed [active="…"] value?
        if (name === ACTIVE) {
          this._setActiveFlag();
        }

        // Changed [animated="…"] value?
        if (name === ANIMATED) {
          this._setAnimationFlag();
        }

        // Changed [close="…"] value?
        if (name === CLOSE) {
          this._setCloseTitle();
        }

        // Changed [static="…"] value?
        if (name === STATIC) {
          this._setStaticFlag();
        }
      }
    }

    // ===========================
    // Lifecycle: component mount.
    // ===========================

    connectedCallback() {
      this._addEvents();
    }

    // =============================
    // Lifecycle: component unmount.
    // =============================

    disconnectedCallback() {
      this._removeEvents();
    }

    // ============================
    // Helper: bind `this` context.
    // ============================

    _bind() {
      // Get property names.
      const propertyNames = Object.getOwnPropertyNames(
        // Get prototype.
        Object.getPrototypeOf(this)
      );

      // Loop through.
      propertyNames.forEach((name) => {
        // Bind functions.
        if (typeof this[name] === FUNCTION) {
          this[name] = this[name].bind(this);
        }
      });
    }

    // ===================
    // Helper: add events.
    // ===================

    _addEvents() {
      // Prevent doubles.
      this._removeEvents();

      document.addEventListener(FOCUSIN, this._handleFocusIn);
      document.addEventListener(KEYDOWN, this._handleKeyDown);

      this._buttonClose.addEventListener(CLICK, this._handleClickToggle);
      this._modalOverlay.addEventListener(CLICK, this._handleClickOverlay);

      if (this._slotForButton) {
        this._slotForButton.addEventListener(CLICK, this._handleClickToggle);
        this._slotForButton.addEventListener(KEYDOWN, this._handleClickToggle);
      }

      if (this._slotForModal) {
        this._slotForModal.addEventListener(CLICK, this._handleClickToggle);
        this._slotForModal.addEventListener(KEYDOWN, this._handleClickToggle);
      }
    }

    // ======================
    // Helper: remove events.
    // ======================

    _removeEvents() {
      document.removeEventListener(FOCUSIN, this._handleFocusIn);
      document.removeEventListener(KEYDOWN, this._handleKeyDown);

      this._buttonClose.removeEventListener(CLICK, this._handleClickToggle);
      this._modalOverlay.removeEventListener(CLICK, this._handleClickOverlay);

      if (this._slotForButton) {
        this._slotForButton.removeEventListener(CLICK, this._handleClickToggle);
        this._slotForButton.removeEventListener(KEYDOWN, this._handleClickToggle);
      }

      if (this._slotForModal) {
        this._slotForModal.removeEventListener(CLICK, this._handleClickToggle);
        this._slotForModal.removeEventListener(KEYDOWN, this._handleClickToggle);
      }
    }

    // ===========================
    // Helper: set animation flag.
    // ===========================

    _setAnimationFlag() {
      this._isAnimated = this.getAttribute(ANIMATED) !== FALSE;
    }

    // ========================
    // Helper: add close title.
    // ========================

    _setCloseTitle() {
      // Get title.
      const title = this.getAttribute(CLOSE) || CLOSE_TITLE;

      // Set title.
      this._buttonClose.title = title;
      this._buttonClose.setAttribute(ARIA_LABEL, title);
    }

    // ========================
    // Helper: add modal label.
    // ========================

    _setModalLabel() {
      // Set later.
      let label = MODAL_LABEL_FALLBACK;

      // Heading exists?
      if (this._heading) {
        // Get text.
        label = this._heading.textContent || label;
        label = label.trim().replace(SPACE_REGEX, SPACE);
      }

      // Set label.
      this._modal.setAttribute(ARIA_LABEL, label);
    }

    // ========================
    // Helper: set active flag.
    // ========================

    _setActiveFlag() {
      // Get flag.
      const isActive = this.getAttribute(ACTIVE) === TRUE;

      // Set flag.
      this._isActive = isActive;

      // Set display.
      this._toggleModalDisplay(() => {
        // Focus modal?
        if (this._isActive) {
          this._focusModal();
        }
      });
    }

    // ========================
    // Helper: set static flag.
    // ========================

    _setStaticFlag() {
      this._isStatic = this.getAttribute(STATIC) === TRUE;
    }

    // ======================
    // Helper: focus element.
    // ======================

    _focusElement(element) {
      window.requestAnimationFrame(() => {
        if (typeof element.focus === FUNCTION) {
          element.focus();
        }
      });
    }

    // ====================
    // Helper: focus modal.
    // ====================

    _focusModal() {
      window.requestAnimationFrame(() => {
        this._modal.focus();
        this._modalScroll.scrollTo(0, 0);
      });
    }

    // =============================
    // Helper: detect outside modal.
    // =============================

    _isOutsideModal(element) {
    // Early exit.
    if (!this._isActive || !element) {
    return false;
  }

  // Has element?
  const hasElement = this.contains(element) || this._modal.contains(element);

  // Get boolean.
  const bool = !hasElement;

  // Expose boolean.
  return bool;
}

  // ===========================
  // Helper: detect motion pref.
  // ===========================

  _isMotionOkay() {
    // Get pref.
    const { matches } = window.matchMedia(PREFERS_REDUCED_MOTION);

    // Expose boolean.
    return this._isAnimated && !matches;
  }

  // =====================
  // Helper: toggle modal.
  // =====================

  _toggleModalDisplay(callback) {
    // @ts-expect-error boolean
    this.setAttribute(ACTIVE, this._isActive);

    // Get booleans.
    const isModalVisible = this._modalScroll.style.display === BLOCK;
    const isMotionOkay = this._isMotionOkay();

    // Get delay.
    const delay = isMotionOkay ? ANIMATION_DURATION : 0;

    // Get scrollbar width.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Get active element.
    const activeElement = document.activeElement;

    // Cache active element?
    if (this._isActive && activeElement) {
      this._activeElement = activeElement;
    }

    // =============
    // Modal active?
    // =============

    if (this._isActive) {
      // Show modal.
      this._modalScroll.style.display = BLOCK;

      // Hide scrollbar.
      document.documentElement.style.overflow = HIDDEN;

      // Add placeholder?
      if (scrollbarWidth) {
        document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
      }

      // Set flag.
      if (isMotionOkay) {
        this._isHideShow = true;
        this._modalScroll.setAttribute(DATA_SHOW, TRUE);
      }

      // Fire callback.
      callback();

      // Await CSS animation.
      this._timerForShow = window.setTimeout(() => {
        // Clear.
        clearTimeout(this._timerForShow);

        // Remove flag.
        this._isHideShow = false;
        this._modalScroll.removeAttribute(DATA_SHOW);

        // Delay.
      }, delay);

      /*
      =====
      NOTE:
      =====

        We want to ensure that the modal is currently
        visible, because we do not want to put scroll
        back on the `<html>` element unnecessarily.

        The reason is that another `<cta-modal>` in
        the page might have been pre-rendered with an
        [active="true"] attribute. If so, we want to
        leave the page's overflow value alone.
      */
    } else if (isModalVisible) {
      // Set flag.
      if (isMotionOkay) {
        this._isHideShow = true;
        this._modalScroll.setAttribute(DATA_HIDE, TRUE);
      }

      // Fire callback?
      callback();

      // Await CSS animation.
      this._timerForHide = window.setTimeout(() => {
        // Clear.
        clearTimeout(this._timerForHide);

        // Remove flag.
        this._isHideShow = false;
        this._modalScroll.removeAttribute(DATA_HIDE);

        // Hide modal.
        this._modalScroll.style.display = NONE;

        // Show scrollbar.
        document.documentElement.style.overflow = EMPTY_STRING;

        // Remove placeholder.
        document.documentElement.style.paddingRight = EMPTY_STRING;

        // Delay.
      }, delay);
    }
  }

  // =====================
  // Event: overlay click.
  // =====================

  _handleClickOverlay(event) {
    // Early exit.
    if (this._isHideShow || this._isStatic) {
      return;
    }

    // Get layer.
    const target = event.target;

    // Outside modal?
    if (target.classList.contains('cta-modal__overlay')) {
      this._handleClickToggle();
    }
  }

  // ====================
  // Event: toggle modal.
  // ====================

  _handleClickToggle(event) {
    // Set later.
    let key = EMPTY_STRING;
    let target = null;

    // Event exists?
    if (event) {
      if (event.target) {
        target = event.target;
      }

      // Get key.
      if (event.key) {
        key = event.key;
        key = key.toLowerCase();
      }
    }

    // Set later.
    let button;

    // Target exists?
    if (target) {
      // Direct click.
      if (target.classList.contains('cta-modal__close')) {
        button = target;

        // Delegated click.
      } else if (typeof target.closest === FUNCTION) {
        button = target.closest('.cta-modal-toggle');
      }
    }

    // Get booleans.
    const isValidEvent = event && typeof event.preventDefault === FUNCTION;
    const isValidClick = button && isValidEvent && !key;
    const isValidKey = button && isValidEvent && [ENTER, SPACE].includes(key);

    const isButtonDisabled = button && button.disabled;
    const isButtonMissing = isValidEvent && !button;
    const isWrongKeyEvent = key && !isValidKey;

    // Early exit.
    if (isButtonDisabled || isButtonMissing || isWrongKeyEvent) {
      return;
    }

    // Prevent default?
    if (isValidKey || isValidClick) {
      event.preventDefault();
    }

    // Set flag.
    this._isActive = !this._isActive;

    // Set display.
    this._toggleModalDisplay(() => {
      // Focus modal?
      if (this._isActive) {
        this._focusModal();

        // Return focus?
      } else if (this._activeElement) {
        this._focusElement(this._activeElement);
      }
    });
  }

  // =========================
  // Event: focus in document.
  // =========================

  _handleFocusIn() {
    // Early exit.
    if (!this._isActive) {
      return;
    }

    // prettier-ignore
    const activeElement = (
      // Get active element.
      this._shadow.activeElement ||
      document.activeElement
    );

    // Get booleans.
    const isFocusTrap1 = activeElement === this._focusTrapList[0];
    const isFocusTrap2 = activeElement === this._focusTrapList[1];

    // Set later.
    let focusListReal = [];

    // Slot exists?
    if (this._slotForModal) {
      // Get "real" elements.
      focusListReal = Array.from(
        this._slotForModal.querySelectorAll(FOCUSABLE_SELECTORS)
      );
    }

    // Get "shadow" elements.
    const focusListShadow = Array.from(
      this._modal.querySelectorAll(FOCUSABLE_SELECTORS)
    );

    // Get "total" elements.
    const focusListTotal = focusListShadow.concat(focusListReal);

    // Get first & last items.
    const focusItemFirst = focusListTotal[0];
    const focusItemLast = focusListTotal[focusListTotal.length - 1];

    // Focus trap: above?
    if (isFocusTrap1 && focusItemLast) {
      this._focusElement(focusItemLast);

      // Focus trap: below?
    } else if (isFocusTrap2 && focusItemFirst) {
      this._focusElement(focusItemFirst);

      // Outside modal?
    } else if (this._isOutsideModal(activeElement)) {
      this._focusModal();
    }
  }

  // =================
  // Event: key press.
  // =================

  _handleKeyDown({ key }) {
    // Early exit.
    if (!this._isActive) {
      return;
    }

    // Get key.
    key = key.toLowerCase();

    // Escape key?
    if (key === ESCAPE && !this._isHideShow && !this._isStatic) {
      this._handleClickToggle();
    }

    // Tab key?
    if (key === TAB) {
      this._handleFocusIn();
    }
  }
}

  // ===============
  // Define element.
  // ===============

  window.addEventListener('DOMContentLoaded', () => {
    window.customElements.define('cta-modal', CtaModal);
  });
}

// =========================
// END: if "customElements".
// =========================
