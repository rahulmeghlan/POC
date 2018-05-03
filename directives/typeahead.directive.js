angular.module('app')
    .directive('typeahead', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/typeahead-template.html',
            link: function ($scope, elem, attr) {

                let typeAheadElem = $(elem).find('.typeahead_input');
                let type = 'component';

                bindEvents();

                function bindEvents() {
                    typeAheadElem.bind('typeahead:select', function (ev, suggestion) {
                        $scope.selectedVal = suggestion;
                        console.log('Selection: ', suggestion);
                        console.log('Type: ', type);
                    });
                }

                function substringMatcher(strs) {
                    return function findMatches(q, cb) {
                        let matches, substrRegex;

                        // an array that will be populated with substring matches
                        matches = [];

                        // regex used to determine if a string contains the substring `q`
                        substrRegex = new RegExp(q, 'i');

                        // iterate through the pool of strings and for any string that
                        // contains the substring `q`, add it to the `matches` array
                        $.each(strs, function (i, str) {
                            if (substrRegex.test(str.name)) {
                                type = 'component';
                                matches.push(str);
                            } else if (substrRegex.test(str.sa)) {
                                type = 'subAssembly';
                                matches.push(str);
                            }
                        });

                        cb(matches);
                    };
                }

                let list = [{name: 'Plugin 1', sa: 'Sub Assembly 1'},
                    {name: 'Another Plugin', sa: 'Sub Assembly 1'}];

                typeAheadElem.typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        source: substringMatcher(list),
                        display: 'name',
                        templates: {
                            suggestion: Handlebars.compile('<div class="btr-suggestion"><p><span class="name">{{name}}</span>  <span class="sub-assembly">{{sa}}</span></p></div>')
                        }
                    });
            }
        }
    });
