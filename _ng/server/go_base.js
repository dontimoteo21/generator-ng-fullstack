"use strict";

const knownPaths = require('../utils/known_paths');
const yoUtils = require('../utils/yeoman-utils');

const basePath = (generator) => {
  return {
    route: `${knownPaths.PATH_SERVER_FEATURES + generator.feature}/route/${generator.name}route`,
    controller: `${knownPaths.PATH_SERVER_FEATURES + generator.feature}/controller/${generator.name}controller`,
    dao: `${knownPaths.PATH_SERVER_FEATURES + generator.feature}/dao/${generator.name}dao`,
    model: `${knownPaths.PATH_SERVER_FEATURES + generator.feature}/model/${generator.name}model`,
    daoTest: `${knownPaths.PATH_SERVER_FEATURES + generator.feature}/dao/${generator.name}dao_test`,
    modelTest: `${knownPaths.PATH_SERVER_FEATURES + generator.feature}/model/${generator.name}model_test`,
    controllerTest: `${knownPaths.PATH_SERVER_FEATURES + generator.feature}/controller/${generator.name}controller_test`,
    routeTest: `${knownPaths.PATH_SERVER_FEATURES + generator.feature}/route/${generator.name}route_test`
  };
};

exports.GoBase = class GoBase {
  constructor(generator, webFramework) {
    this.wrapper = generator;
    this.webFramework = webFramework;
  }

  copyFiles() {
    let _featureWithoutTrailingSlash = this.wrapper.feature.replace('/', '');
    let gen = basePath(this.wrapper);

    this.wrapper.template('go/'+this.webFramework+'/endpoint.route.go', `${gen.route}.go`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase(),
      userNameSpace: this.wrapper.userNameSpace,
      repoHostUrl: this.wrapper.repoHostUrl,
      appName: this.wrapper.appName,
      feature: _featureWithoutTrailingSlash
    });

    this.wrapper.template('go/'+this.webFramework+'/endpoint.controller.go', `${gen.controller}.go`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase(),
      userNameSpace: this.wrapper.userNameSpace,
      repoHostUrl: this.wrapper.repoHostUrl,
      appName: this.wrapper.appName,
      feature: _featureWithoutTrailingSlash
    });

    this.wrapper.template('go/'+this.webFramework+'/endpoint.dao.go', `${gen.dao}.go`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase(),
      userNameSpace: this.wrapper.userNameSpace,
      repoHostUrl: this.wrapper.repoHostUrl,
      appName: this.wrapper.appName,
      feature: _featureWithoutTrailingSlash
    });

    this.wrapper.template('go/'+this.webFramework+'/endpoint.model.go', `${gen.model}.go`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase(),
      userNameSpace: this.wrapper.userNameSpace,
      repoHostUrl: this.wrapper.repoHostUrl,
      appName: this.wrapper.appName,
      feature: _featureWithoutTrailingSlash
    });

    this.wrapper.template('go/'+this.webFramework+'/endpoint.dao_test.go', `${gen.daoTest}.go`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase(),
      userNameSpace: this.wrapper.userNameSpace,
      repoHostUrl: this.wrapper.repoHostUrl,
      appName: this.wrapper.appName,
      feature: _featureWithoutTrailingSlash
    });

    this.wrapper.template('go/'+this.webFramework+'/endpoint.model_test.go', `${gen.modelTest}.go`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase(),
      userNameSpace: this.wrapper.userNameSpace,
      repoHostUrl: this.wrapper.repoHostUrl,
      appName: this.wrapper.appName,
      feature: _featureWithoutTrailingSlash
    });

    this.wrapper.template('go/'+this.webFramework+'/endpoint.controller_test.go', `${gen.controllerTest}.go`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase(),
      userNameSpace: this.wrapper.userNameSpace,
      repoHostUrl: this.wrapper.repoHostUrl,
      appName: this.wrapper.appName,
      feature: _featureWithoutTrailingSlash
    });

    this.wrapper.template('go/'+this.webFramework+'/endpoint.route_test.go', `${gen.routeTest}.go`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase(),
      userNameSpace: this.wrapper.userNameSpace,
      repoHostUrl: this.wrapper.repoHostUrl,
      appName: this.wrapper.appName,
      feature: _featureWithoutTrailingSlash
    });
  }

  copyServer() {
    this.wrapper.differentStaticServer = !!this.wrapper.differentStaticServer || (this.wrapper.stack === "server");

    if (this.wrapper.secure) {
      this.wrapper.template('server/go/'+this.webFramework+'/main_http2.go', 'server/main.go', {
        appName: this.wrapper.appName,
        userNameSpace: this.wrapper.userNameSpace,
        repoHostUrl: this.wrapper.repoHostUrl,
        differentStaticServer: !!this.wrapper.differentStaticServer
      });
    }
    else {
      this.wrapper.template('server/go/'+this.webFramework+'/main.go', 'server/main.go', {
        appName: this.wrapper.appName,
        userNameSpace: this.wrapper.userNameSpace,
        repoHostUrl: this.wrapper.repoHostUrl,
        differentStaticServer: !!this.wrapper.differentStaticServer
      });
    }

    let _paths = [
      ['server/go/'+this.webFramework+'/routes/routes.go', 'server/routes/routes.go'],
      ['server/go/'+this.webFramework+'/routes/routes_test.go', 'server/routes/routes_test.go'],

      ['server/go/'+this.webFramework+'/config/dbconfig.go', 'server/config/dbconfig.go'],
      ['server/go/'+this.webFramework+'/config/dbconfig_test.go', 'server/config/dbconfig_test.go'],

      ['server/go/'+this.webFramework+'/api/todo/route/todoroute.go', 'server/api/todo/route/todoroute.go'],
      ['server/go/'+this.webFramework+'/api/todo/route/todoroute_test.go', 'server/api/todo/route/todoroute_test.go'],

      ['server/go/'+this.webFramework+'/api/todo/model/todomodel.go', 'server/api/todo/model/todomodel.go'],
      ['server/go/'+this.webFramework+'/api/todo/model/todomodel_test.go', 'server/api/todo/model/todomodel_test.go'],

      ['server/go/'+this.webFramework+'/api/todo/dao/tododao.go', 'server/api/todo/dao/tododao.go'],
      ['server/go/'+this.webFramework+'/api/todo/dao/tododao_test.go', 'server/api/todo/dao/tododao_test.go'],

      ['server/go/'+this.webFramework+'/api/todo/controller/todocontroller.go', 'server/api/todo/controller/todocontroller.go'],
      ['server/go/'+this.webFramework+'/api/todo/controller/todocontroller_test.go', 'server/api/todo/controller/todocontroller_test.go'],
    ];

    if (!this.wrapper.differentStaticServer) {
      _paths.push(['server/go/'+this.webFramework+'/common/static/static.go', 'server/common/static/static.go'],
                  ['server/go/'+this.webFramework+'/common/static/static_test.go', 'server/common/static/static_test.go']);
    }

    yoUtils.directory(this.wrapper, _paths, {
      appName: this.wrapper.appName,
      userNameSpace: this.wrapper.userNameSpace,
      repoHostUrl: this.wrapper.repoHostUrl,
      differentStaticServer: !!this.wrapper.differentStaticServer
    });
  }
};
