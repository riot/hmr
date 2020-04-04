(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('riot'), require('bianco.query')) :
  typeof define === 'function' && define.amd ? define(['exports', 'riot', 'bianco.query'], factory) :
  (global = global || self, factory(global.riotHotReload = {}, global.riot, global.$));
}(this, (function (exports, riot, $) { 'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;

  const { cssManager } = riot.__;
  const { DOM_COMPONENT_INSTANCE_PROPERTY } = riot.__.globals;

  function reload(componentAPI) {
    const {name} = componentAPI;

    if (!name) {
      console.warn('Anonymous components can not be reloaded'); // eslint-disable-line
      return []
    }

    return $(`${name}, [is=${name}]`).map(el => {
      const oldTag = el[DOM_COMPONENT_INSTANCE_PROPERTY];

      // early return in case there is no riot instance found
      if (!oldTag) return

      // remove the tag template from the DOM
      oldTag.unmount(true);
      // delete the old css from the css manager
      cssManager.remove(name);

      // create the new tag
      const newTag = riot.component(componentAPI)(el, oldTag.props);
      newTag.update(oldTag.state);

      return newTag
    })
  }

  exports.default = reload;
  exports.reload = reload;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
