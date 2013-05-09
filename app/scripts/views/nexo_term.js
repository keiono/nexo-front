/**
 * Created with JetBrains WebStorm.
 * User: kono
 * Date: 2013/05/07
 * Time: 16:34
 * To change this template use File | Settings | File Templates.
 */

var nexo = nexo || {};

nexo.NexoTermView = Backbone.View.extend({

    tagName: 'div',
    className: 'termContainer',
    template: $('#termTemplate').html(),

    events: {
    },

    render: function () {
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));

        return this;
    }
});
