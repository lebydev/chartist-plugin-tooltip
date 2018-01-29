(function (window, document, Chartist) {
    'use strict';

    var defaultOptions = {
        class: undefined,
        tooltipFnc: undefined
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.tooltip = function (options) {
        options = Chartist.extend({}, defaultOptions, options);

        return function tooltip(chart) {
            var $chart = chart.container;
            var $toolTip = document.querySelector('.chartist-tooltip');
            var height, width;

            function on(event, callback) {
                $chart.addEventListener(event, function(e) {
                    callback(e);
                });
            }

            on('mouseover', function(event) {
                if ($toolTip) { removeElement($toolTip); }
                var point = event.target;
                var tooltipText = '';

                var isPieChart = (chart instanceof Chartist.Pie) ? point : point.parentNode;
                var seriesName = isPieChart ? point.parentNode.getAttribute('ct:meta') || point.parentNode.getAttribute('ct:series-name') : '';
                var meta = point.getAttribute('ct:meta') || seriesName || '';
                var value = point.getAttribute('ct:value');
                var hasMetaValue = !!meta && Number(value) > 0;

                if (options.transformTooltipTextFnc && typeof options.transformTooltipTextFnc === 'function') {
                    value = options.transformTooltipTextFnc(value);
                }

                if (options.tooltipFnc && typeof options.tooltipFnc === 'function' && hasMetaValue) {
                    tooltipText = '<span class=chartist-tooltip-value>' + options.tooltipFnc(meta, value) + '</span>';
                } else if (hasMetaValue) {
                    tooltipText = '<span class="chartist-tooltip-value">' + meta + ': ' + value + '</span>';
                }

                if (tooltipText) {
                    renderTooltip(tooltipText, event.pageX, event.pageY);
                }
            });

            on('mouseout', function() {
                if ($toolTip) {
                    removeElement($toolTip);
                }
            });

            on('mousemove', function(event) {
                setPosition(event.pageX, event.pageY);
            });

            function renderTooltip(text, x, y) {
                $toolTip = document.createElement('div');
                $toolTip.className = (!options.class) ? 'chartist-tooltip' : 'chartist-tooltip' + options.class;
                $toolTip.innerHTML = text;
                setPosition(x, y);
                $chart.insertBefore($toolTip, chart.container.childNodes[0]);

                height = $toolTip.offsetHeight;
                width = $toolTip.offsetWidth;
            }

            function setPosition(x, y) {
                if ($toolTip) {
                    height = height || $toolTip.offsetHeight;
                    width = width || $toolTip.offsetWidth;
                    var offsetX = - (width / 2);
                    var offsetY = - height - 8;

                    var box = $chart.getBoundingClientRect();
                    var left = x - box.left;
                    var top = y - box.top;

                    $toolTip.style.top = top + offsetY + 'px';
                    $toolTip.style.left = left + offsetX + 'px';
                }
            }

            $chart.removeEventListener('mouseover', on);
            $chart.removeEventListener('mousemove', on);
            $chart.removeEventListener('mouseout', on);
        };
    };

    function removeElement(element) {
        if (!!document.documentMode) {
            element.removeNode(true);
        } else {
            element.remove();
        }
    }
} (window, document, Chartist));