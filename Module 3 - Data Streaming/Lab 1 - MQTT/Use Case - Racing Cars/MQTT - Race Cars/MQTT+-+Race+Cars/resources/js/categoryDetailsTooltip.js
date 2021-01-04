/*!
 * Copyright 2002 - 2015 Webdetails, a Pentaho company.  All rights reserved.
 *
 * NOTICE: All information including source code contained herein is, and
 * remains the sole property of Pentaho and its licensors. The intellectual
 * and technical concepts contained herein are proprietary and confidential
 * to, and are trade secrets of Pentaho and may be covered by U.S. and foreign
 * patents, or patents in process, and are protected by trade secret and
 * copyright laws. The receipt or possession of this source code and/or related
 * information does not convey or imply any rights to reproduce, disclose or
 * distribute its contents, or to manufacture, use, or sell anything that it
 * may describe, in whole or in part. Any reproduction, modification, distribution,
 * or public display of this information without the express written authorization
 * from Pentaho is strictly prohibited and in violation of applicable laws and
 * international treaties. Access to the source code contained herein is strictly
 * prohibited to anyone except those individuals and entities who have executed
 * confidentiality and non-disclosure agreements or other agreements with Pentaho,
 * explicitly covering such access.
 */

(function() {
    "use strict";

    /*global define:true, pvc:true, def:true */

    function moduleDef(def, pvc) {

        var defaultTotalLabel = "Total";

        // NOTE: In the following doclet, an @example tag would do code highlighting
        // but the code would be placed inside the constructor docs, not the class.

        /**
         * @class
         * @name pvc.ext.CategoryDetailsTooltip
         *
         * @classdesc A category &amp; details HTML tooltip,
         * that can be applied to __categorical charts__,
         * specially to the __bar__ and __point__ families.
         *
         * This is a _documentation constructor_.
         * To create an instance, use the factory function
         * {@link pvc.ext.categoryDetailsTooltip}.
         *
         * ## Basic Usage
         * Include the extension's JS file.
         * If using AMD, the "css" plugin is required and is used to automatically load the
         * accompanying stylesheet.
         * Otherwise, the extension's CSS file must be included manually.
         *
         * In CDE, add the file or files as dashboard resources.
         *
         * Then, within a CDF chart component's `preExecution` handler, write:
         * ```javascript
         * pvc.ext.categoryDetailsTooltip()
         *      .install(this.chartDefinition);
         * ```
         *
         * ## Special Usage
         *
         * #### Without the Category Label
         *
         * ```javascript
         * pvc.ext.categoryDetailsTooltip()
         *      .categoryVisible(false)
         *      .install(this.chartDefinition);
         * ```
         *
         * #### With a Total Label
         *
         * ```javascript
         * pvc.ext.categoryDetailsTooltip()
         *      .showTotal(true)
         *      .install(this.chartDefinition);
         * ```
         *
         * Changing the total label text:
         *
         * ```javascript
         * pvc.ext.categoryDetailsTooltip()
         *      .showTotal(true)
         *      .totalLabel("Totus")
         *      .install(this.chartDefinition);
         * ```
         *
         * #### Showing Nulls
         *
         * ```javascript
         * pvc.ext.categoryDetailsTooltip()
         *      .ignoreNulls(false)
         *      .install(this.chartDefinition);
         * ```
         *
         * ## Live examples
         *
         * [Examples page](examples/exts/categoryDetailsTooltip/examples.html).
         */

        // CCC Classes extensions

        // Don't show the axis label tooltip unless it has been trimmed or hidden.
        pvc.AxisPanel.add({
            /** @override */
            _getTooltipFormatter: function(tipOptions) {
                if(this.axis.option('TooltipEnabled') &&
                   this.axis.option('TooltipAutoContent') === "value") {

                    tipOptions.isLazy = false;
                    return function(context) {
                        var text  = context.pvMark.text(),
                            label = context.scene.vars.tick.label;
                        return text !== label ? label : "";
                    };
                }

                return this.base(tipOptions);
            }
        });

        /**
         * Creates a category &amp; details tooltip formatter.
         * @alias categoryDetailsTooltip
         * @memberOf pvc.ext
         * @function
         * @return {pvc.ext.CategoryDetailsTooltip} A new tooltip formatter.
         */
        function categoryDetailsTooltip() {
            var _catVisible  = true,
                _showTotal   = false,
                _ignoreNulls = true,
                _totalLabel  = defaultTotalLabel,
                _renderer    = defaultRenderer;

            function formatter(cd, defaults) {

                // Optional
                var copy = (defaults ? def.setUDefaults : def.copyOwn);
                copy(cd, {
                    tooltipEnabled:     true,
                    tooltipOpacity:     1,
                    tooltipGravity:     's',
                    tooltipClassName:   'ccc-ext-tooltip-categorical',
                    tooltipFollowMouse: true
                });

                // Required
                cd.tooltipFormat = formatter.format;
                return formatter;
            }

            /**
             * Installs this extension in a given chart definition.
             *
             * The formatter instance itself can be called as a function,
             * being equivalent to calling this method.
             *
             * This function defaults the properties:
             * * `tooltipEnabled` — `true`
             * * `tooltipOpacity` — `1`
             * * `tooltipGravity` — `"s"`
             * * `tooltipClassName` — `"ccc-ext-tooltip-categorical"`
             * * `tooltipFollowMouse` — `true`
             *
             * This function sets the required property: `tooltipFormat`.
             *
             * @name pvc.ext.CategoryDetailsTooltip#install
             * @function
             * @param {Object} cd The chart definition to extend.
             * @param {boolean} [defaults=false] Indicates that
             * only required or optional properties not present in the chart definition are set.
             * @return {pvc.ext.CategoryDetailsTooltip} This instance.
             */
            formatter.install = formatter;

            /**
             * Formats an HTML tooltip for a given scene.
             *
             * This function can be called on any `this` context,
             * and will always exhibit the same behavior.
             *
             * Normally you would not use this function directly,
             * as {@link pvc.ext.CategoryDetailsTooltip#install}
             * sets this as the chart's `tooltipFormat` for you.
             *
             * @alias format
             * @memberOf pvc.ext.CategoryDetailsTooltip#
             * @function
             * @param {pvc.visual.Scene} scene The categorical scene for which to render the tooltip.
             * @return {string} The tooltip HTML string.
             */
            formatter.format = function(scene) {
                var model = buildModel.call(formatter, scene);
                return _renderer.call(formatter, model);
            };

            // NOTE: by some strange reason JSDoc wasn't accepting the
            // memberOf/alias tag pair in the following doclet. The membed would not appear.
            // The name tag, however, worked.

            /**
             * Gets or sets if the category label is visible.
             *
             * The default value is `true`.
             *
             * @name pvc.ext.CategoryDetailsTooltip#categoryVisible
             * @function
             * @param {boolean} [_] The new value.
             * @return {pvc.ext.CategoryDetailsTooltip|boolean} The property value, when getting, `this` instance, when setting.
             */
            formatter.categoryVisible = function(_) {
                if(arguments.length) {
                    _catVisible = !!_;
                    return formatter;
                }
                return _catVisible;
            };

            /**
             * Gets or sets if the details include a total series.
             *
             * The default value is `false`.
             *
             * @alias showTotal
             * @memberOf pvc.ext.CategoryDetailsTooltip#
             * @function
             * @param {boolean} [_] The new value.
             * @return {pvc.ext.CategoryDetailsTooltip|boolean} The property value, when getting, `this` instance, when setting.
             */
            formatter.showTotal = function(_) {
                if(arguments.length) {
                    _showTotal = !!_;
                    return formatter;
                }
                return _showTotal;
            };

            /**
             * Gets or sets the label of the total value.
             *
             * The default label is `"Total"`.
             *
             * This option is only relevant when {@link #showTotal} is `true`.
             *
             * @alias totalLabel
             * @memberOf pvc.ext.CategoryDetailsTooltip#
             * @function
             * @param {boolean} [_] The new value.
             * @return {pvc.ext.CategoryDetailsTooltip|boolean} The property value, when getting, `this` instance, when setting.
             */
            formatter.totalLabel = function(_) {
                if(arguments.length) {
                    _totalLabel = _ || defaultTotalLabel;
                    return formatter;
                }
                return _totalLabel;
            };

            /**
             * Gets or sets if the details include series whose value dimension is `null`.
             *
             * The default value is `false`.
             *
             * @alias ignoreNulls
             * @memberOf pvc.ext.CategoryDetailsTooltip#
             * @function
             * @param {boolean} [_] The new value.
             * @return {pvc.ext.CategoryDetailsTooltip|boolean} The property value, when getting, `this` instance, when setting.
             */
            formatter.ignoreNulls = function(_) {
                if(arguments.length) {
                    _ignoreNulls = !!_;
                    return formatter;
                }
                return _ignoreNulls;
            };

            /**
             * Gets or sets a custom HTML render function.
             *
             * The renderer is called with a pre-built tooltip model object,
             * and having this instance as `this` context.
             * @alias renderer
             * @memberOf pvc.ext.CategoryDetailsTooltip#
             * @function
             * @param {function} [_] The new renderer.
             * @return {pvc.ext.CategoryDetailsTooltip|function} The property value, when getting, `this` instance, when setting.
             */
            formatter.renderer = function(_) {
                if(arguments.length) {
                    _renderer = def.fun.as(_) || defaultRenderer;
                    return formatter;
                }
                return _renderer;
            };

            return formatter;
        }

        function buildModel(scene) {
            var rootScene  = scene.root,
                //catIndex   = scene.childIndex(),
                catValue   = scene.getCategory(),
                valueDimName = rootScene.panel().visualRoles.value.firstDimensionName(),
                valueDim   = rootScene.data().dimensions(valueDimName),
                colorScale = rootScene.panel().axes.color.isDiscrete()
                    ? rootScene.panel().axes.color.scale
                    : null,
                total   = 0,
                details = [];

            rootScene.childNodes.forEach(function(seriesScene) {
                var sameCatScene = findSameCategoryScene(seriesScene, catValue),
                    //sameCatScene = seriesScene.childNodes[catIndex],
                    value = sameCatScene ? sameCatScene.vars.value : {value: null, label: ""};

                if(value.value != null || !this.ignoreNulls()) {
                    total += (value.value || 0);
                    var colorVar = colorScale &&
                                  (seriesScene.vars.color || (sameCatScene && sameCatScene.vars.color)),
                        color = colorVar && colorScale(colorVar.value);
                    details.push({
                        color:  color ? color.color : null,
                        series: seriesScene.vars.series,
                        value:  value
                    });
                }
            }, this);

            return {
                category: scene.vars.category,
                details:  details.length ? details : null,
                total:    {value: total, label: valueDim.format(total)}
            };
        }

        // TODO: Fix this when http://jira.pentaho.com/browse/CDF-487 is fixed.
        function findSameCategoryScene(seriesScene, catValue) {
            var i = -1,
                cn = seriesScene.childNodes,
                L = cn.length,
                s;
            while(++i < L) {
                if((s = cn[i]) && !s.isIntermediate && s.getCategory() === catValue) {
                    return s;
                }
            }
        }

        function defaultRenderer(tooltip) {
            var html = '<div>';

            if(this.categoryVisible()) {
                html += '<div class="category">' + def.html.escape(tooltip.category.label) + '</div>';
            }

            if(tooltip.details) {
                if(this.showTotal()) {
                    tooltip.details.unshift({
                        color: null,
                        series: {value: "_total_", label: this.totalLabel()},
                        value:  tooltip.total
                    });
                }

                if(this.categoryVisible()) {
                    html += '<hr />';
                }

                html += '<table class="series-detail">';

                tooltip.details.forEach(function(detail) {
                    html += '<tr class="series-' + def.html.escape(detail.series.value) + '">' +
                                '<td class="series">' +
                                    (detail.color
                                     ? ('<div class="color" style="background-color:' + detail.color + ';">&nbsp;</div>')
                                     : '') +
                                    '<span>' + def.html.escape(detail.series.label) + '</span>' +
                                '</td>' +
                                '<td class="value">' + def.html.escape(detail.value.label) + '</td>' +
                            '</tr>';
                });

                html += "</table>";
            }

            html += '</div>';

            return html;
        }

        (pvc.ext || (pvc.ext = {})).categoryDetailsTooltip = categoryDetailsTooltip;

        return categoryDetailsTooltip;
    }

    if(typeof define !== "undefined" && define.amd) {
        define(["cdf/lib/CCC/def", "cdf/lib/CCC/pvc", "css!./categoryDetailsTooltip.default.css"], moduleDef);
    } else if(typeof pvc !== "undefined") {
        moduleDef(def, pvc);
    }
}());
