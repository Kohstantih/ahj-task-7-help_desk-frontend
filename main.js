/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ (function(module) {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }
  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign

  url = String(url.__esModule ? url.default : url);
  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }
  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }
  return url;
};

/***/ }),

/***/ "./src/js/CommunicationServer.js":
/*!***************************************!*\
  !*** ./src/js/CommunicationServer.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CommunicationServer; }
/* harmony export */ });
class CommunicationServer {
  constructor(port) {
    this.port = port;
  }
  async getTicket(id) {
    let url = this.port;
    if (!id) {
      url += '?method=allTickets';
    } else {
      url += `?method=ticketById&id=${id}`;
    }
    const result = await fetch(url);
    return result;
  }
  async sendNewTicket(data) {
    const url = `${this.port}?method=createTicket`;
    const result = await fetch(url, {
      method: 'POST',
      body: data
    });
    return result;
  }
  async sendToggleStatus(id) {
    const url = `${this.port}?method=toggleStatus`;
    const result = await fetch(url, {
      method: 'PATCH',
      body: id
    });
    return result;
  }
  async sendEditTicket(data) {
    const url = `${this.port}?method=editTicket`;
    const result = await fetch(url, {
      method: 'PATCH',
      body: data
    });
    return result;
  }
  async sendDelTicket(id) {
    const url = `${this.port}?method=deleteTicket&id=${id}`;
    const result = await fetch(url, {
      method: 'DELETE'
    });
    return result;
  }
}

/***/ }),

/***/ "./src/js/GetDate.js":
/*!***************************!*\
  !*** ./src/js/GetDate.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GetDate; }
/* harmony export */ });
class GetDate {
  static getFormatDate() {
    const date = new Date();
    const dd = GetDate.getDay(date);
    const mm = GetDate.getMonth(date);
    const yy = GetDate.getYear(date);
    const fullDate = `${dd}.${mm}.${yy}`;
    const time = date.toTimeString().slice(0, 5);
    const result = `${fullDate} ${time}`;
    return result;
  }
  static getDay(date) {
    let dd = date.getDate();
    if (dd.length === 1) dd = `0${dd}`;
    return dd;
  }
  static getMonth(date) {
    let mm = date.getMonth() + 1;
    if (mm.length === 1) mm = `0${mm}`;
    return mm;
  }
  static getYear(date) {
    const result = `${date.getUTCFullYear()}`.slice(2, 4);
    return result;
  }
}

/***/ }),

/***/ "./src/js/InteractionWidget.js":
/*!*************************************!*\
  !*** ./src/js/InteractionWidget.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ InteractionWidget; }
/* harmony export */ });
/* harmony import */ var _GetDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GetDate */ "./src/js/GetDate.js");
/* harmony import */ var _TicketWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TicketWidget */ "./src/js/TicketWidget.js");


class InteractionWidget {
  constructor(widget, communicator, showErrorMessage, toolTip, loadingImg) {
    this.widget = widget;
    this.communicator = communicator;
    this.showErrorMessage = showErrorMessage;
    this.toolTip = toolTip;
    this.loadingImg = loadingImg;
    this.targetTicketId = null;
    this.formStatus = null;
    this.addListener = this.addListener.bind(this);
    this.openForm = this.openForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
    this.ticketDescription = this.ticketDescription.bind(this);
    this.openConfirm = this.openConfirm.bind(this);
    this.canselDel = this.canselDel.bind(this);
    this.delTicket = this.delTicket.bind(this);
    this.hideError = this.hideError.bind(this);
    this.changeTextarea = this.changeTextarea.bind(this);
    this.callbacks = [this.toggleStatus, this.ticketDescription, this.openForm, this.openConfirm];
  }
  activation() {
    this.getListTickets();
    this.addListener();
    this.widget.errorBtnOK.addEventListener('click', this.hideError);
    this.widget.textareaShort.addEventListener('input', this.changeTextarea);
    this.widget.textareaDetailed.addEventListener('input', this.changeTextarea);
  }
  addListener() {
    this.widget.btnAddTicket.addEventListener('click', this.openForm);
    this.widget.formTicket.addEventListener('submit', this.submitForm);
    this.widget.formCansel.addEventListener('click', this.closeForm);
    this.widget.confirmCansel.addEventListener('click', this.canselDel);
    this.widget.confirmOk.addEventListener('click', this.delTicket);
  }
  removeListener() {
    this.widget.btnAddTicket.removeEventListener('click', this.openForm);
    this.widget.formTicket.removeEventListener('submit', this.submitForm);
    this.widget.formCansel.removeEventListener('click', this.closeForm);
    this.widget.confirmCansel.removeEventListener('click', this.canselDel);
    this.widget.confirmOk.removeEventListener('click', this.delTicket);
  }
  getListTickets() {
    this.loadingImg.showLoading();
    this.communicator.getTicket().then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось загрузить список тикетов');
    }).then(data => {
      if (data) {
        return this.renderingTikets(data);
      }
      throw new Error('Данные отсутствуют');
    }).catch(error => {
      this.loadingImg.hideLoading();
      this.widget.showCurtain('red');
      this.showErrorMessage.showMessage(error.message);
    });
  }
  renderingTikets(data) {
    this.widget.removeAllTickets();
    this.widget.elDescription = null;
    for (let i = 0; i < data.length; i += 1) {
      const el = _TicketWidget__WEBPACK_IMPORTED_MODULE_1__["default"].createTicket(data[i], ...this.callbacks);
      this.widget.pasteTicket(el);
    }
    this.loadingImg.hideLoading();
  }
  openForm(e) {
    e.preventDefault();
    if (!e.target.classList.contains('edit_btn')) {
      this.widget.formTitle.textContent = 'Добавить тикет';
      this.formStatus = 'new';
    } else {
      this.widget.formTitle.textContent = 'Изменить тикет';
      this.formStatus = 'edit';
      this.defineTargetId(e.target);
      this.editTicket();
    }
    this.unblockForm();
  }
  unblockForm() {
    this.widget.showCurtain();
    this.widget.showForm();
  }
  closeForm(e) {
    e.preventDefault();
    this.toolTip.hideAllToolTips();
    this.blockForm();
  }
  blockForm() {
    this.widget.resetForm();
    this.widget.hideCurtain();
    this.widget.hideForm();
  }
  submitForm(e) {
    e.preventDefault();
    const emtyTextarea = this.getEmptyTextarea();
    if (emtyTextarea.length !== 0) {
      emtyTextarea.forEach(et => this.toolTip.showToolTip(et, 'Поле необходимо заполнить'));
    } else {
      const formData = new FormData(this.widget.formTicket);
      this.loadingImg.showLoading();
      if (this.formStatus === 'new') {
        const status = false;
        formData.append('status', status);
        const created = _GetDate__WEBPACK_IMPORTED_MODULE_0__["default"].getFormatDate();
        formData.append('created', created);
        this.communicator.sendNewTicket(formData).then(response => {
          if (response.ok) {
            return this.getListTickets();
          }
          throw new Error('Не удалось создать тикет');
        }).catch(error => {
          this.loadingImg.hideLoading();
          this.widget.showCurtain('red');
          this.showErrorMessage.showMessage(error.message);
        });
      } else if (this.formStatus === 'edit') {
        formData.append('id', this.targetTicketId);
        this.communicator.sendEditTicket(formData).then(response => {
          if (response.ok) {
            return this.getListTickets();
          }
          throw new Error('Не удалось сохранить изменения тикета');
        }).catch(error => {
          this.loadingImg.hideLoading();
          this.widget.showCurtain('red');
          this.showErrorMessage.showMessage(error.message);
        });
      }
      this.targetTicketId = null;
      this.formStatus = null;
      this.closeForm(e);
    }
  }
  getEmptyTextarea() {
    const result = [];
    if (this.widget.textareaShort.value.length === 0) result.push(this.widget.textareaShort);
    if (this.widget.textareaDetailed.value.length === 0) result.push(this.widget.textareaDetailed);
    return result;
  }
  toggleStatus(e) {
    e.preventDefault();
    this.loadingImg.showLoading();
    const {
      id
    } = e.target.closest('.ticket_box').dataset;
    const jsonId = JSON.stringify(id);
    this.communicator.sendToggleStatus(jsonId).then(response => {
      if (response.ok) {
        return this.getListTickets();
      }
      throw new Error('Не удалось изменить статус');
    }).catch(error => {
      this.loadingImg.hideLoading();
      this.widget.showCurtain('red');
      this.showErrorMessage.showMessage(error.message);
    });
  }
  ticketDescription(e) {
    e.preventDefault();
    if (this.widget.elDescription) {
      this.widget.elDescription.remove();
      this.widget.elDescription = null;
    } else {
      this.loadingImg.showLoading();
      const {
        id
      } = e.target.closest('.ticket_box').dataset;
      const allTickets = this.widget.serchAllTickets();
      this.communicator.getTicket(id).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Не удалось загрузить подробное описание');
      }).then(data => {
        const ticket = allTickets.find(t => t.dataset.id === data.id);
        this.widget.showDescription(ticket, data.description);
        this.loadingImg.hideLoading();
      }).catch(error => {
        this.loadingImg.hideLoading();
        this.widget.showCurtain('red');
        this.showErrorMessage.showMessage(error.message);
      });
    }
  }
  editTicket() {
    this.loadingImg.showLoading();
    this.communicator.getTicket(this.targetTicketId).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось загрузить редактируемый тикет');
    }).then(data => {
      this.widget.fillForm(data);
      this.loadingImg.hideLoading();
    }).catch(error => {
      this.loadingImg.hideLoading();
      this.widget.showCurtain('red');
      this.showErrorMessage.showMessage(error.message);
    });
  }
  openConfirm(e) {
    e.preventDefault();
    this.defineTargetId(e.target);
    this.widget.showConfirmWindow();
  }
  canselDel(e) {
    e.preventDefault();
    this.targetTicketId = null;
    this.widget.hideConfirmWindow();
  }
  delTicket(e) {
    e.preventDefault();
    this.loadingImg.showLoading();
    this.communicator.sendDelTicket(this.targetTicketId).then(response => {
      if (response.ok) {
        return this.getListTickets();
      }
      throw new Error('Не удалось удалить тикет');
    }).catch(error => {
      this.loadingImg.hideLoading();
      this.widget.showCurtain('red');
      this.showErrorMessage.showMessage(error.message);
    });
    this.targetTicketId = null;
    this.widget.hideConfirmWindow();
  }
  defineTargetId(target) {
    this.targetTicketId = target.closest('.ticket_box').dataset.id;
  }
  hideError(e) {
    e.preventDefault();
    this.showErrorMessage.hideMessage();
    this.widget.hideCurtain();
  }
  changeTextarea(e) {
    if (this.toolTip.toolTipsBox.find(tt => tt.dataset.name === e.target.name)) {
      this.toolTip.hideToolTip(e.target.name);
    }
  }
}

/***/ }),

/***/ "./src/js/LoadingWidget.js":
/*!*********************************!*\
  !*** ./src/js/LoadingWidget.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ LoadingWidget; }
/* harmony export */ });
class LoadingWidget {
  constructor(box) {
    this.box = box;
  }
  showLoading() {
    this.box.classList.remove('hiden');
  }
  hideLoading() {
    this.box.classList.add('hiden');
  }
}

/***/ }),

/***/ "./src/js/ShowErrorMessage.js":
/*!************************************!*\
  !*** ./src/js/ShowErrorMessage.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ShowErrorMessage; }
/* harmony export */ });
class ShowErrorMessage {
  constructor(container, classNameBox, classNameMessage, classNameHide) {
    this.container = container;
    this.classNameBox = classNameBox;
    this.classNameMessage = classNameMessage;
    this.classNameHide = classNameHide;
    this.errorMessageBox = this.container.querySelector(`.${this.classNameBox}`);
    this.errorMessage = this.errorMessageBox.querySelector(`.${this.classNameMessage}`);
  }
  showMessage(message) {
    if (message) this.errorMessage.textContent = message;
    this.errorMessageBox.classList.remove(this.classNameHide);
  }
  hideMessage() {
    this.errorMessage.textContent = '';
    this.errorMessageBox.classList.add(this.classNameHide);
  }
}

/***/ }),

/***/ "./src/js/TicketWidget.js":
/*!********************************!*\
  !*** ./src/js/TicketWidget.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TicketWidget; }
/* harmony export */ });
class TicketWidget {
  constructor(container) {
    this.container = container;
    this.btnAddTicket = this.container.querySelector('.add_ticket');
    this.ticketList = this.container.querySelector('.ticket_list');
    this.formTicket = document.forms.ticket;
    this.formTitle = this.formTicket.querySelector('.create_ticket_title');
    this.formCansel = this.formTicket.querySelector('.create_btn-cansel');
    this.textareaShort = this.formTicket.name;
    this.textareaDetailed = this.formTicket.description;
    this.confirmWindow = this.container.querySelector('.confirm_box');
    this.confirmCansel = this.confirmWindow.querySelector('.confirm_btn-cansel');
    this.confirmOk = this.confirmWindow.querySelector('.confirm_btn-ok');
    this.curtain = this.container.querySelector('.curtain');
    this.errorBtnOK = this.container.querySelector('.error-message_ok');
    this.elDescription = null;
  }
  static createTicket(obj, callbackStatus, callbackDescription, callbackEdit, callbackDel) {
    const ticketBox = TicketWidget.createElement('div', ['ticket_box']);
    ticketBox.dataset.id = obj.id;
    const statusBox = TicketWidget.createElement('div', ['ticket_status-box']);
    const checkView = TicketWidget.createElement('div', ['check-view']);
    if (obj.status === true) checkView.classList.add('status_ready');
    if (callbackStatus) checkView.addEventListener('click', callbackStatus);
    statusBox.append(checkView);
    ticketBox.append(statusBox);
    const textBox = TicketWidget.createElement('div', ['ticket_text-box']);
    if (callbackDescription) textBox.addEventListener('click', callbackDescription);
    const ticketTitle = TicketWidget.createElement('span', ['ticket_title', 'ticket-text']);
    ticketTitle.textContent = obj.name;
    textBox.append(ticketTitle);
    ticketBox.append(textBox);
    const dateBox = TicketWidget.createElement('div', ['ticket_date-box']);
    const ticketDate = TicketWidget.createElement('span', ['ticket_date']);
    ticketDate.textContent = obj.created;
    dateBox.append(ticketDate);
    ticketBox.append(dateBox);
    const btnsBox = TicketWidget.createElement('div', ['ticket_btns-box']);
    const editBtn = TicketWidget.createElement('button', ['ticket-btn', 'edit_btn'], [{
      name: 'type',
      value: 'button'
    }]);
    if (callbackEdit) editBtn.addEventListener('click', callbackEdit);
    const delBtn = TicketWidget.createElement('button', ['ticket-btn', 'del_btn'], [{
      name: 'type',
      value: 'button'
    }]);
    if (callbackDel) delBtn.addEventListener('click', callbackDel);
    btnsBox.append(editBtn);
    btnsBox.append(delBtn);
    ticketBox.append(btnsBox);
    return ticketBox;
  }
  static createElement(tag, classes, attributes) {
    const element = document.createElement(tag);
    if (classes) element.classList.add(...classes);
    if (attributes) {
      for (let i = 0; i < attributes.length; i += 1) {
        element.setAttribute(attributes[i].name, attributes[i].value);
      }
    }
    return element;
  }
  pasteTicket(element) {
    this.ticketList.append(element);
  }
  serchAllTickets() {
    return [...this.ticketList.querySelectorAll('.ticket_box')];
  }
  removeAllTickets() {
    this.serchAllTickets().forEach(el => el.remove());
  }
  showDescription(ticket, description) {
    this.elDescription = TicketWidget.createElement('span', ['ticket_description', 'ticket-text']);
    this.elDescription.textContent = description;
    ticket.querySelector('.ticket_text-box').append(this.elDescription);
  }
  fillForm(obj) {
    this.formTicket.name.value = obj.name;
    this.formTicket.description.value = obj.description;
  }
  showForm() {
    this.formTicket.classList.remove('hiden');
  }
  resetForm() {
    this.formTicket.reset();
  }
  hideForm() {
    this.formTicket.classList.add('hiden');
  }
  showConfirmWindow() {
    this.showCurtain();
    this.confirmWindow.classList.remove('hiden');
  }
  hideConfirmWindow() {
    this.hideCurtain();
    this.confirmWindow.classList.add('hiden');
  }
  showCurtain(color) {
    if (color) this.curtain.style.backgroundColor = color;
    this.curtain.classList.remove('hiden');
  }
  hideCurtain() {
    if (this.curtain.style) this.curtain.removeAttribute('style');
    this.curtain.classList.add('hiden');
  }
}

/***/ }),

/***/ "./src/js/ToolTip.js":
/*!***************************!*\
  !*** ./src/js/ToolTip.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ToolTip; }
/* harmony export */ });
class ToolTip {
  constructor(classNameTooltip) {
    this.classNameTooltip = classNameTooltip;
    this.toolTipsBox = [];
  }
  showToolTip(element, message) {
    const toolTip = document.createElement('div');
    toolTip.classList.add(this.classNameTooltip);
    toolTip.textContent = message;
    toolTip.dataset.name = element.name;
    this.toolTipsBox.push(toolTip);
    document.body.append(toolTip);
    const {
      bottom,
      left
    } = element.getBoundingClientRect();
    const offsetHorizont = (toolTip.offsetWidth - element.offsetWidth) / 2;
    toolTip.style.left = `${left - offsetHorizont}px`;
    toolTip.style.top = `${bottom + 5}px`;
  }
  hideAllToolTips() {
    for (let i = 0; i < this.toolTipsBox.length; i += 1) {
      this.toolTipsBox[i].remove();
    }
    this.toolTipsBox = [];
  }
  hideToolTip(name) {
    const hideToolTip = this.toolTipsBox.find(t => t.dataset.name === name);
    hideToolTip.remove();
    this.toolTipsBox = this.toolTipsBox.filter(t => t !== hideToolTip);
  }
}

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommunicationServer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommunicationServer */ "./src/js/CommunicationServer.js");
/* harmony import */ var _TicketWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TicketWidget */ "./src/js/TicketWidget.js");
/* harmony import */ var _InteractionWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InteractionWidget */ "./src/js/InteractionWidget.js");
/* harmony import */ var _ShowErrorMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ShowErrorMessage */ "./src/js/ShowErrorMessage.js");
/* harmony import */ var _ToolTip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ToolTip */ "./src/js/ToolTip.js");
/* harmony import */ var _LoadingWidget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LoadingWidget */ "./src/js/LoadingWidget.js");






const port = 'http://localhost:7000';
const container = document.querySelector('.container');
const loadingBox = document.querySelector('.loading');
const loadingImg = new _LoadingWidget__WEBPACK_IMPORTED_MODULE_5__["default"](loadingBox);
const widget = new _TicketWidget__WEBPACK_IMPORTED_MODULE_1__["default"](container);
const communicator = new _CommunicationServer__WEBPACK_IMPORTED_MODULE_0__["default"](port);
const showErrorMessage = new _ShowErrorMessage__WEBPACK_IMPORTED_MODULE_3__["default"](container, 'error-message_box', 'error-message_text', 'hiden');
const toolTip = new _ToolTip__WEBPACK_IMPORTED_MODULE_4__["default"]('tooltip');
const worker = new _InteractionWidget__WEBPACK_IMPORTED_MODULE_2__["default"](widget, communicator, showErrorMessage, toolTip, loadingImg);
worker.activation();

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./img/loading.png */ "./src/img/loading.png"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n    <title>HelpDesk</title>\n</head>\n<body>\n    <div class=\"container\">\n        <button type=\"button\" class=\"add_ticket\">Добавить тикет</button>\n        <div class=\"ticket_list\"></div>\n        <form name=\"ticket\" class=\"create_ticket hiden\">\n            <h3 class=\"create_ticket_title\"></h3>\n            <span class=\"description-title\">Краткое описание</span>\n            <textarea class=\"enter-text short-description\" name=\"name\"></textarea>\n            <span class=\"description-title\">Подробное описание</span>\n            <textarea class=\"enter-text detailed-description\" name=\"description\"></textarea>\n            <div class=\"create_btns-box\">\n                <button type=\"reset\" class=\"create-btn create_btn-cansel\">Отмена</button>\n                <button type=\"submit\" class=\"create-btn create_btn-add\">Оk</button>\n            </div>\n        </form>\n        <div class=\"confirm_box hiden\">\n            <h3 class=\"confirm_title\">Удалить тикет</h3>\n            <span class=\"confirm_text\">\n                Вы уверены что хотите удалить тикет?\n            </span>\n            <div class=\"confirm_btn-box\">\n                <button class=\"confirm_btn confirm_btn-cansel\">Отмена</button>\n                <button class=\"confirm_btn confirm_btn-ok\">Оk</button>\n            </div>\n        </div>\n        <div class=\"curtain hiden\"></div>\n        <div class=\"error-message_box hiden\">\n            <h3 class=\"error-message_title\">Произошла ошибка</h3>\n            <span class=\"error-message_text\"></span>\n            <button type=\"button\" class=\"error-message_ok\">Ok</button>\n        </div>\n    </div>\n    <div class=\"loading hiden\">\n        <img src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"Идет загрузка\">\n    </div>    \n</body>\n</html>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/img/loading.png":
/*!*****************************!*\
  !*** ./src/img/loading.png ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/loading.png";

/***/ }),

/***/ "./src/licenses.txt":
/*!**************************!*\
  !*** ./src/licenses.txt ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "licenses.txt";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/app */ "./src/js/app.js");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");
/* harmony import */ var _licenses_txt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./licenses.txt */ "./src/licenses.txt");




}();
/******/ })()
;
//# sourceMappingURL=main.js.map