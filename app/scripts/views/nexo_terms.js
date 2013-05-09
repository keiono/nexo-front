/**
 * Created with JetBrains WebStorm.
 * User: kono
 * Date: 2013/05/07
 * Time: 16:39
 * To change this template use File | Settings | File Templates.
 */

var nexo = nexo || {};

nexo.NexoTermListView = Backbone.View.extend({
    el: $('#terms'),

    initialize: function () {
        this.collection = new nexo.NexoTermList();
        this.collection.fetch();
        this.render();

        this.listenTo(this.collection, 'show', this.renderTerm);
        this.listenTo(this.collection, 'reset', this.render);
    },

    events: {
        'click #search': 'showTerms'
    },

    showTerms: function (e) {
        e.preventDefault();

        var formData = {};

        $('#search div').children('input').each(function (i, el) {
            console.log("Renderer called!");
//            if ($(el).val() != "") {
//                console.log("Renderer called!");
//                if (el.id === 'keywords') {
//                    formData[ el.id ] = [];
//                    _.each($(el).val().split(' '), function (keyword) {
//                        formData[ el.id ].push({ 'keyword': keyword });
//                    });
//                } else if (el.id === 'releaseDate') {
//                    formData[ el.id ] = $('#releaseDate').datepicker('getDate').getTime();
//                } else {
//                    formData[ el.id ] = $(el).val();
//                }
//            }
        });

        this.collection.create(formData);
    },

    render: function () {
        this.collection.each(function (item) {
            this.renderTerm(item);
        }, this);
    },

    renderTerm: function (item) {
        var termView = new nexo.NexoTermView({
            model: item
        });
        this.$el.append(termView.render().el);
    }
});