/**
 * Created with JetBrains WebStorm.
 * User: kono
 * Date: 2013/05/07
 * Time: 15:49
 * To change this template use File | Settings | File Templates.
 */

var nexo = nexo || {};

nexo.NexoTerm = Backbone.Model.extend({

    defaults: {
        name: 'unknown',
        description: '-',
        robustness: 0
    },

    idAttribute: '_id',

    toJSON: function() {
        return {_id:1, name: "test"}
    }


});