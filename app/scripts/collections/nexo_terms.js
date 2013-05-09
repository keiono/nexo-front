/**
 * Created with JetBrains WebStorm.
 * User: kono
 * Date: 2013/05/07
 * Time: 15:58
 * To change this template use File | Settings | File Templates.
 */

var nexo = nexo || {};

nexo.NexoTermList = Backbone.Collection.extend({

    model: nexo.NexoTerm,
    url: 'http://localhost:8182/graphs/neo4jnexo/vertices?key=name&value=NeXO:8888'

});