
function initTMap(){

    //status on whether to show or not the background canvas
    let FullMolinBkg = false;

    let smilesDrawer = new SmilesDrawer.Drawer({
      width: 250 / window.devicePixelRatio,
      height: 250 / window.devicePixelRatio,
      experimental: true
    });

    class Faerun {
      constructor() {
        this.body = document.getElementsByTagName('body')[0];

        this.selectedItems = [];
        this.selectedIndicators = [];
        this.selectedCurrent = [];
        this.scatterMeta = [{"categorical": [true, true, false], "fog_intensity": 0.0, "has_legend": true, "interactive": true, "is_range": [false, false, true], "label_index": [0, 0, 0], "legend": [[[[0.12156862745098039, 0.4666666666666667, 0.7058823529411765, 1.0], "Alkaloids and derivatives"], [[0.6823529411764706, 0.7803921568627451, 0.9098039215686274, 1.0], "Benzenoids"], [[1.0, 0.4980392156862745, 0.054901960784313725, 1.0], "Homogeneous non-metal compounds"], [[1.0, 0.7333333333333333, 0.47058823529411764, 1.0], "Hydrocarbon derivatives"], [[0.17254901960784313, 0.6274509803921569, 0.17254901960784313, 1.0], "Hydrocarbons"], [[0.596078431372549, 0.8745098039215686, 0.5411764705882353, 1.0], "Lignans, neolignans and related compounds"], [[0.8392156862745098, 0.15294117647058825, 0.1568627450980392, 1.0], "Lipids and lipid-like molecules"], [[1.0, 0.596078431372549, 0.5882352941176471, 1.0], "Nucleosides, nucleotides, and analogues"], [[0.5803921568627451, 0.403921568627451, 0.7411764705882353, 1.0], "Organic 1,3-dipolar compounds"], [[0.7725490196078432, 0.6901960784313725, 0.8352941176470589, 1.0], "Organic Polymers"], [[0.5490196078431373, 0.33725490196078434, 0.29411764705882354, 1.0], "Organic acids and derivatives"], [[0.7686274509803922, 0.611764705882353, 0.5803921568627451, 1.0], "Organic nitrogen compounds"], [[0.8901960784313725, 0.4666666666666667, 0.7607843137254902, 1.0], "Organic oxygen compounds"], [[0.9686274509803922, 0.7137254901960784, 0.8235294117647058, 1.0], "Organohalogen compounds"], [[0.4980392156862745, 0.4980392156862745, 0.4980392156862745, 1.0], "Organoheterocyclic compounds"], [[0.7803921568627451, 0.7803921568627451, 0.7803921568627451, 1.0], "Organometallic compounds"], [[0.7372549019607844, 0.7411764705882353, 0.13333333333333333, 1.0], "Organophosphorus compounds"], [[0.8588235294117647, 0.8588235294117647, 0.5529411764705883, 1.0], "Organosulfur compounds"], [[0.09019607843137255, 0.7450980392156863, 0.8117647058823529, 1.0], "Phenylpropanoids and polyketides"], [[0.6196078431372549, 0.8549019607843137, 0.8980392156862745, 1.0], "unknown"]], [[[0.2235294117647059, 0.23137254901960785, 0.4745098039215686, 1.0], "Alkaloids"], [[0.3215686274509804, 0.32941176470588235, 0.6392156862745098, 1.0], "Alkaloids; Amino acids and Peptides"], [[0.4196078431372549, 0.43137254901960786, 0.8117647058823529, 1.0], "Alkaloids; Carbohydrates"], [[0.611764705882353, 0.6196078431372549, 0.8705882352941177, 1.0], "Alkaloids; Fatty acids"], [[0.38823529411764707, 0.4745098039215686, 0.2235294117647059, 1.0], "Alkaloids; Polyketides"], [[0.5490196078431373, 0.6352941176470588, 0.3215686274509804, 1.0], "Alkaloids; Shikimates and Phenylpropanoids"], [[0.7098039215686275, 0.8117647058823529, 0.4196078431372549, 1.0], "Alkaloids; Terpenoids"], [[0.807843137254902, 0.8588235294117647, 0.611764705882353, 1.0], "Amino acids and Peptides"], [[0.5490196078431373, 0.42745098039215684, 0.19215686274509805, 1.0], "Amino acids and Peptides; Fatty acids"], [[0.7411764705882353, 0.6196078431372549, 0.2235294117647059, 1.0], "Amino acids and Peptides; Polyketides"], [[0.9058823529411765, 0.7294117647058823, 0.3215686274509804, 1.0], "Amino acids and Peptides; Shikimates and Phenylpropanoids"], [[0.9058823529411765, 0.796078431372549, 0.5803921568627451, 1.0], "Amino acids and Peptides; Terpenoids"], [[0.5176470588235295, 0.23529411764705882, 0.2235294117647059, 1.0], "Carbohydrates"], [[0.6784313725490196, 0.28627450980392155, 0.2901960784313726, 1.0], "Carbohydrates; Fatty acids"], [[0.8392156862745098, 0.3803921568627451, 0.4196078431372549, 1.0], "Carbohydrates; Terpenoids"], [[0.9058823529411765, 0.5882352941176471, 0.611764705882353, 1.0], "Fatty acids"], [[0.4823529411764706, 0.2549019607843137, 0.45098039215686275, 1.0], "Fatty acids; Polyketides"], [[0.6470588235294118, 0.3176470588235294, 0.5803921568627451, 1.0], "Fatty acids; Shikimates and Phenylpropanoids"], [[0.807843137254902, 0.42745098039215684, 0.7411764705882353, 1.0], "Fatty acids; Terpenoids"], [[0.8705882352941177, 0.6196078431372549, 0.8392156862745098, 1.0], "Polyketides"], [[0.19215686274509805, 0.5098039215686274, 0.7411764705882353, 1.0], "Polyketides; Shikimates and Phenylpropanoids"], [[0.4196078431372549, 0.6823529411764706, 0.8392156862745098, 1.0], "Polyketides; Terpenoids"], [[0.6196078431372549, 0.792156862745098, 0.8823529411764706, 1.0], "Shikimates and Phenylpropanoids"], [[0.7764705882352941, 0.8588235294117647, 0.9372549019607843, 1.0], "Shikimates and Phenylpropanoids; Terpenoids"], [[0.9019607843137255, 0.3333333333333333, 0.050980392156862744, 1.0], "Terpenoids"], [[0.9921568627450981, 0.5529411764705883, 0.23529411764705882, 1.0], "unknown"]], [[[0.993248, 0.906157, 0.143936, 1.0], "980.5327239999999"], [[0.974417, 0.90359, 0.130215, 1.0], "684.443724"], [[0.945636, 0.899815, 0.112838, 1.0], "159.122724"], [[0.926106, 0.89733, 0.104071, 1.0], "266.00872400000003"], [[0.89632, 0.893616, 0.096335, 1.0], "254.15178200000003"], [[0.866013, 0.889868, 0.095953, 1.0], "229.23972400000002"], [[0.845561, 0.887322, 0.099702, 1.0], "693.389724"], [[0.814576, 0.883393, 0.110347, 1.0], "313.302724"], [[0.79376, 0.880678, 0.120005, 1.0], "66.525724"], [[0.762373, 0.876424, 0.137064, 1.0], "372.267724"], [[0.730889, 0.871916, 0.156029, 1.0], "330.1837235480092"], [[0.709898, 0.868751, 0.169257, 1.0], "151.062724"], [[0.678489, 0.863742, 0.189503, 1.0], "536.2877239999999"], [[0.657642, 0.860219, 0.203082, 1.0], "307.323724"], [[0.626579, 0.854645, 0.223353, 1.0], "136.122724"], [[0.595839, 0.848717, 0.243329, 1.0], "308.040724"], [[0.575563, 0.844566, 0.256415, 1.0], "340.178724"], [[0.545524, 0.838039, 0.275626, 1.0], "371.225724"], [[0.515992, 0.831158, 0.294279, 1.0], "311.22472400000004"], [[0.496615, 0.826376, 0.306377, 1.0], "385.127724"], [[0.468053, 0.818921, 0.323998, 1.0], "383.24672400000003"], [[0.449368, 0.813768, 0.335384, 1.0], "360.132724"], [[0.421908, 0.805774, 0.35191, 1.0], "369.16972400000003"], [[0.395174, 0.797475, 0.367757, 1.0], "384.08772400000004"], [[0.377779, 0.791781, 0.377939, 1.0], "435.168724"], [[0.35236, 0.783011, 0.392636, 1.0], "449.184724"], [[0.335885, 0.777018, 0.402049, 1.0], "273.100724"], [[0.311925, 0.767822, 0.415586, 1.0], "404.183724"], [[0.288921, 0.758394, 0.428426, 1.0], "317.271724"], [[0.274149, 0.751988, 0.436601, 1.0], "794.429724"], [[0.252899, 0.742211, 0.448284, 1.0], "404.183724"], [[0.239374, 0.735588, 0.455688, 1.0], "140.046724"], [[0.220124, 0.725509, 0.466226, 1.0], "380.219724"], [[0.202219, 0.715272, 0.476084, 1.0], "1000"], [[0.19109, 0.708366, 0.482284, 1.0], "1000"], [[0.175707, 0.6979, 0.491033, 1.0], "266.151724"], [[0.162016, 0.687316, 0.499129, 1.0], "366.110724"], [[0.153894, 0.680203, 0.504172, 1.0], "510.173724"], [[0.143303, 0.669459, 0.511215, 1.0], "391.235724"], [[0.137339, 0.662252, 0.515571, 1.0], "404.183289"], [[0.130067, 0.651384, 0.521608, 1.0], "282.14628899999997"], [[0.12478, 0.640461, 0.527068, 1.0], "385.225724"], [[0.122312, 0.633153, 0.530398, 1.0], "590.3827239999999"], [[0.120081, 0.622161, 0.534946, 1.0], "401.240724"], [[0.119483, 0.614817, 0.537692, 1.0], "225.140724"], [[0.119738, 0.603785, 0.5414, 1.0], "260.15272400000003"], [[0.121148, 0.592739, 0.544641, 1.0], "101.052724"], [[0.122606, 0.585371, 0.546557, 1.0], "204.183724"], [[0.125394, 0.574318, 0.549086, 1.0], "1000"], [[0.127568, 0.566949, 0.550556, 1.0], "222.088724"], [[0.131172, 0.555899, 0.552459, 1.0], "314.245724"], [[0.135066, 0.544853, 0.554029, 1.0], "370.232289"], [[0.13777, 0.537492, 0.554906, 1.0], "152.122782"], [[0.141935, 0.526453, 0.555991, 1.0], "506.335724"], [[0.14618, 0.515413, 0.556823, 1.0], "413.478724"], [[0.149039, 0.508051, 0.55725, 1.0], "756.554724"], [[0.153364, 0.497, 0.557724, 1.0], "750.5077239999999"], [[0.15627, 0.489624, 0.557936, 1.0], "690.544724"], [[0.160665, 0.47854, 0.558115, 1.0], "167.073724"], [[0.165117, 0.467423, 0.558141, 1.0], "503.077724"], [[0.168126, 0.459988, 0.558082, 1.0], "367.178724"], [[0.172719, 0.448791, 0.557885, 1.0], "282.08072400000003"], [[0.175841, 0.44129, 0.557685, 1.0], "321.103724"], [[0.180629, 0.429975, 0.557282, 1.0], "347.136724"], [[0.185556, 0.41857, 0.556753, 1.0], "401.231724"], [[0.188923, 0.41091, 0.556326, 1.0], "400.18172400000003"], [[0.1941, 0.399323, 0.555565, 1.0], "402.14072400000003"], [[0.19943, 0.387607, 0.554642, 1.0], "362.119724"], [[0.203063, 0.379716, 0.553925, 1.0], "331.098724"], [[0.208623, 0.367752, 0.552675, 1.0], "340.153724"], [[0.212395, 0.359683, 0.55171, 1.0], "363.983724"], [[0.21813, 0.347432, 0.550038, 1.0], "444.054724"], [[0.223925, 0.334994, 0.548053, 1.0], "304.105724"], [[0.227802, 0.326594, 0.546532, 1.0], "530.3967819999999"], [[0.233603, 0.313828, 0.543914, 1.0], "275.115724"], [[0.237441, 0.305202, 0.541921, 1.0], "136.12078200000002"], [[0.243113, 0.292092, 0.538516, 1.0], "204.192724"], [[0.248629, 0.278775, 0.534556, 1.0], "462.112724"], [[0.252194, 0.269783, 0.531579, 1.0], "550.362724"], [[0.257322, 0.25613, 0.526563, 1.0], "552.2707819999999"], [[0.260571, 0.246922, 0.522828, 1.0], "310.162724"], [[0.265145, 0.232956, 0.516599, 1.0], "1000"], [[0.269308, 0.218818, 0.509577, 1.0], "718.3027239999999"], [[0.271828, 0.209303, 0.504434, 1.0], "168.082724"], [[0.275191, 0.194905, 0.496005, 1.0], "639.4027239999999"], [[0.278012, 0.180367, 0.486697, 1.0], "558.252724"], [[0.279574, 0.170599, 0.479997, 1.0], "378.992724"], [[0.281412, 0.155834, 0.469201, 1.0], "370.3197235480092"], [[0.28229, 0.145912, 0.46151, 1.0], "1000"], [[0.283072, 0.130895, 0.449241, 1.0], "338.162724"], [[0.283197, 0.11568, 0.436115, 1.0], "798.164724"], [[0.28291, 0.105393, 0.426902, 1.0], "151.10272400000002"], [[0.281924, 0.089666, 0.412415, 1.0], "277.005724"], [[0.280894, 0.078907, 0.402329, 1.0], "295.108724"], [[0.278791, 0.062145, 0.386592, 1.0], "273.172724"], [[0.276022, 0.044167, 0.370164, 1.0], "307.97927599999997"], [[0.273809, 0.031497, 0.358853, 1.0], "686.2752760000001"], [[0.269944, 0.014625, 0.341379, 1.0], "1000"], [[0.267004, 0.004874, 0.329415, 1.0], "136.063724"]]], "legend_title": ["Chemical_Space", "Chemical_Space", "Chemical_Space"], "mapping": {"c": "c", "cs": "cs", "knn": "knn", "labels": "labels", "s": "s", "x": "x", "y": "y", "z": "z"}, "max_c": [19.0, 25.0, 1000.0], "max_legend_label": ["19", "25", "\u003e=1000"], "max_point_size": 10, "min_c": [0.0, 0.0, -0.00727600000000006], "min_legend_label": ["0", "0", "0.00"], "name": "Chemical_Space", "ondblclick": [null, null, null], "point_scale": 2.5, "selected_labels": [null, null, null], "series_title": ["superclass", "npc pathway", "molecular weight"], "shader": "smoothCircle", "title_index": [0, 0, 0]}];
        this.treeMeta = [{"color": "#666666", "fog_intensity": 0.0, "mapping": {"c": "c", "from": "from", "to": "to", "x": "x", "y": "y", "z": "z"}, "name": "Chemical_Space_tree", "point_helper": "Chemical_Space"}];
        this.seriesState = {};
        this.el = {};

        this.currentPoint = null;

        this.lore = null;
        this.clearColorHex = '#111111';
        this.clearColor = null;
        this.view = 'front';
        this.antiAliasing = true;
        this.alphaBlending = false;

        this.treeHelpers = [];
        this.pointHelpers = [];
        this.octreeHelpers = [];
        this.coordinatesHelper = null;

        this.ohIndexToPhName = [];
        this.ohIndexToPhIndex = [];
        this.phIndexMap = {};
        this.ohIndexMap = {};

        this.min = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE];
        this.max = [-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE];
        this.maxRadius = -Number.MAX_VALUE;

        this.coords = {
          show: false,
          grid: false,
          ticks: true,
          tickCount: 10,
          tickLength: 2.0,
          color: '#888888',
          box: false,
          offset: 5.0
        };

        this.legend = {
          show: true,
          title: 'Legend'
        };

        this.el = Faerun.bindElements();

        this.scatterMeta.forEach(s => {
          this.seriesState[s.name] = 0;
        });

        this.clearColor = Lore.Core.Color.fromHex(this.clearColorHex);
        this.alphaBlending = (this.view === 'free' ? false : true) || this.alphaBlending;

        this.initLore();
        this.initTreeHelpers();
        this.initPointHelpers();
        this.initCoords();
        this.initAxes();
        this.initView();
        this.initEvents();
        this.renderLegend();
      }

      initLore() {
        this.lore = Lore.init('lore', {
          antialiasing: this.antiAliasing,
          clearColor: this.clearColorHex,
          alphaBlending: this.alphaBlending,
          preserveDrawingBuffer: true
        });
      }

      initTreeHelpers() {
        this.treeMeta.forEach(t => {
          let th = new Lore.Helpers.TreeHelper(this.lore, t.name, 'tree');
          th.setXYZHexS(data[t.name].x, data[t.name].y, data[t.name].z, t.color);
          th.setFog([this.clearColor.components[0], this.clearColor.components[1], 
                     this.clearColor.components[2], this.clearColor.components[3]],
                    t.fog_intensity);
          this.treeHelpers.push(th);
        });
      }

      initPointHelpers() {
        this.scatterMeta.forEach(s => {           
          let ph = new Lore.Helpers.PointHelper(
            this.lore, s.name, s.shader, { maxPointSize: s.max_point_size }
          );

          ph.setXYZRGBS(data[s.name].x, data[s.name].y, data[s.name].z, 
                        data[s.name]['colors'][0].r, data[s.name]['colors'][0].g, 
                        data[s.name]['colors'][0].b, data[s.name]['s'] ? data[s.name]['s'][0] : 1.0);

          ph.setPointScale(s.point_scale);
          ph.setFog([this.clearColor.components[0], this.clearColor.components[1],
                     this.clearColor.components[2], this.clearColor.components[3]],
                    s.fog_intensity)

          this.phIndexMap[s.name] = this.pointHelpers.length;
          this.pointHelpers.push(ph);

          this.min[0] = Faerun.getMin(data[s.name].x, this.min[0]);
          this.min[1] = Faerun.getMin(data[s.name].y, this.min[1]);
          this.min[2] = Faerun.getMin(data[s.name].z, this.min[2]);
          this.max[0] = Faerun.getMax(data[s.name].x, this.max[0]);
          this.max[1] = Faerun.getMax(data[s.name].y, this.max[1]);
          this.max[2] = Faerun.getMax(data[s.name].z, this.max[2]);
          this.maxRadius = ph.getMaxRadius();
  
          if (s.interactive && data[s.name].labels) {
            this.octreeHelpers.push(
              new Lore.Helpers.OctreeHelper(this.lore, 'Octree_' + s.name, 'tree', ph)
            );

            this.ohIndexMap[s.name] = this.octreeHelpers.length - 1;
            this.ohIndexToPhName.push(s.name);
            this.ohIndexToPhIndex.push(this.phIndexMap[s.name]);
          }
        });
      }

      initCoords() {
        if (!this.coords.show) return;

        let min = [0, 0, 0];
        let max = [0, 0, 0];

        for (var i = 0; i < 3; i++) {
          min[i] = this.min[i] - this.coords.offset;
          max[i] = this.max[i] + this.coords.offset;
        }

        this.coordinatesHelper = new Lore.Helpers.CoordinatesHelper(this.lore, 'Coordinates', 'coordinates', {
          position: new Lore.Math.Vector3f(min[0], min[1], min[2]),
          axis: {
            x: {
              length: max[0] - min[0],
              color: Lore.Core.Color.fromHex(this.coords.color)
            },
            y: {
              length: max[1] - min[1],
              color: Lore.Core.Color.fromHex(this.coords.color)
            },
            z: {
              length: max[2] - min[2],
              color: Lore.Core.Color.fromHex(this.coords.color)
            }
          },
          ticks: {
            enabled: this.coords.ticks,
            x: {
              length: this.coords.tickLength,
              color: Lore.Core.Color.fromHex(this.coords.color),
              count: this.coords.tickCount
            },
            y: {
              length: this.coords.tickLength,
              color: Lore.Core.Color.fromHex(this.coords.color),
              count: this.coords.tickCount
            },
            z: {
              length: this.coords.tickLength,
              color: Lore.Core.Color.fromHex(this.coords.color),
              count: this.coords.tickCount
            }
          },
          box: {
            enabled: this.coords.box,
            x: {
              color: Lore.Core.Color.fromHex(this.coords.color)
            },
            y: {
              color: Lore.Core.Color.fromHex(this.coords.color)
            },
            z: {
              color: Lore.Core.Color.fromHex(this.coords.color)
            }
          }
        });
      }

      initAxes() {
        // Wait for DOM to get ready
        setTimeout(() => {
          this.updateTitle(true);
          this.updateXAxis(true);
          this.updateYAxis(true);
        }, 500);
      }

      initView() {
        let center = new Lore.Math.Vector3f(
            (this.max[0] + this.min[0]) / 2.0, 
            (this.max[1] + this.min[1]) / 2.0, 
            (this.max[2] + this.min[2]) / 2.0
          );
        this.lore.controls.setLookAt(center);
        this.lore.controls.setRadius(this.maxRadius + 100);
        this.lore.controls.setView(0.9, -0.5)
        this.lore.controls.setViewByName(this.view);
      }

      initEvents() {
        this.lore.controls.addEventListener('updated', () => {
          // Update the position / content of the annotations every time
          // the view changes
          this.updateTitle();
          this.updateYAxis();
          this.updateXAxis();
          this.updateSelectedIndicators();
        });

        Lore.Helpers.OctreeHelper.joinHoveredChanged(this.octreeHelpers, e => {
          let phName = this.ohIndexToPhName[e.source];
          if (e.e && data[phName].labels) {
            let fullLabel = data[phName].labels[e.e.index];
            let labelIndex = this.scatterMeta[this.ohIndexToPhIndex[e.source]]
                                .label_index[this.seriesState[phName]];
            let titleIndex = this.scatterMeta[this.ohIndexToPhIndex[e.source]]
                                .title_index[this.seriesState[phName]];

            let rgbColor = this.pointHelpers[e.source].getColor(e.e.index);
            let hexColor = Lore.Core.Color.rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]);

            this.currentPoint = {
              index: e.e.index,
              fullLabel: fullLabel.split('__'),
              source: phName,
              label: fullLabel.split('__')[labelIndex],
              color: hexColor,
              labelIndex: labelIndex,
              titleIndex: titleIndex
            }
            
            if (FullMolinBkg == true) {

              document.getElementById("overlay-structure-container").style.visibility = "visible";

              var overlayStruc_Width = document.getElementById("overlay-structure-container").offsetWidth
              var overlayStruc_Height = document.getElementById("overlay-structure-container").offsetHeight

              if (overlayStruc_Width > overlayStruc_Height) {overlayStruc_Width = overlayStruc_Height}

              smilesDrawer = new SmilesDrawer.Drawer({
                width: overlayStruc_Width / window.devicePixelRatio,
                height: overlayStruc_Width / window.devicePixelRatio,
                bondThickness: 1.4,
                experimental: true
              });

              this.setTipContent();


              smilesDrawer = new SmilesDrawer.Drawer({
                width: 250 / window.devicePixelRatio,
                height: 250 / window.devicePixelRatio,
                bondThickness: 1.4,
                experimental: true
              });
            } else {

              document.getElementById("overlay-structure-container").style.visibility = "hidden";
              this.setTipContent__();

              this.el.tip.classList.add('show');

              let pointSize = this.pointHelpers[e.source].getPointSize() / window.devicePixelRatio;
              let x = e.e.screenPosition[0];
              let y = e.e.screenPosition[1];

              this.el.hoverIndicator.style.width = pointSize + 'px';
              this.el.hoverIndicator.style.height = pointSize + 'px';
              //MODIFIED from -1 to -2 
              this.el.hoverIndicator.style.left = (x - pointSize / 2.0 - 2) + 'px';
              //MODIFIED from -1 to +180
              this.el.hoverIndicator.style.top = (y - pointSize / 2.0 + 180) + 'px';

              this.el.hoverIndicator.classList.add('show');
              }

          } else {
            this.currentPoint = null;
            this.el.tip.classList.remove('show');
            this.el.hoverIndicator.classList.remove('show');
          }
        });

        Lore.Helpers.OctreeHelper.joinSelectedChanged(this.octreeHelpers, items => {
          this.selectedItems = items;
          this.updateSelected();
        });

        Lore.Helpers.OctreeHelper.joinReselected(this.octreeHelpers, item => {
          this.updateSelected(
            this.getSelectedIndex(item[0].source, item[0].item.e.index)
          );
        });

        // Event listeners
        this.el.selectedPrev.addEventListener('click', e => {
          e.preventDefault();
          this.updateSelected(this.selectedCurrent - 1);
          return false;
        });

        this.el.selectedNext.addEventListener('click', e => {
          e.preventDefault();
          this.updateSelected(this.selectedCurrent + 1);
          return false;
        });

        this.el.selectedRemove.addEventListener('click', e => {
          e.preventDefault();
          let item = this.selectedItems[this.selectedCurrent]
          this.octreeHelpers[item.source].removeSelected(item.index);
          return false;
        });

        document.addEventListener('dblclick', e => {
          if (this.currentPoint) {
            var index = this.currentPoint.index;
            var labels = this.currentPoint.label.split('__');
            var source = this.currentPoint.source;
            eval(this.scatterMeta[this.phIndexMap[source]].ondblclick[this.seriesState[source]]);
          }
        });

        document.addEventListener('mousemove', e => {
          if (FullMolinBkg == false) {

            document.getElementById("tip").style.visibility = "visible";

            let x = e.clientX;
            let y = e.clientY;

            if (x > window.innerWidth - this.el.tip.offsetWidth - 20) {
              x -= this.el.tip.offsetWidth;
            } else {
              x += 10;
            }

            if (y > window.innerHeight - this.el.tip.offsetHeight - 20) {
              y -= this.el.tip.offsetHeight;
            } else {
              y += 10;
            }

            if (this.el.tip) {
              this.el.tip.style.top = y + 'px';
              this.el.tip.style.left = x + 'px';
            }
          } else {
            
            document.getElementById("tip").style.visibility = "hidden";

          }
        });

        this.el.selectedToggle.addEventListener('click', e => {
          this.el.selectedContainer.classList.toggle('hide');
          if (this.el.selectedContainer.classList.contains('hide'))
            this.el.selectedToggle.innerHTML = '<i class="fas fa-toggle-off"></i>';
          else
            this.el.selectedToggle.innerHTML = '<i class="fas fa-toggle-on"></i>';
          
          e.preventDefault();
          return false;
        });

        this.el.showControls.addEventListener('click', e => {
          this.el.moreControls.classList.toggle('hide');
          e.preventDefault();
          return false;
        });

        this.el.search.addEventListener('click', e => {
          let searchTerm = prompt('Please enter a search term:', '');
          const results = this.search(searchTerm);

          for (const [name, indices] of Object.entries(results)) {
            if (!name in this.ohIndexMap) return;
            indices.forEach(index => {
              this.octreeHelpers[this.ohIndexMap[name]].addSelected(index);
            });
          }
          
          e.preventDefault();
          return false;
        });

        window.addEventListener('keydown', e => {
          if ((e.keyCode == 114) || (e.ctrlKey && e.keyCode == 70)) {
            this.search();
            e.preventDefault();
            return false;
          }
        });

        this.el.export.addEventListener('click', e => {
          e.preventDefault();

          let canvas = document.getElementById('lore');
          let zoom = this.lore.controls.getZoom();

          canvas.style.width = (canvas.width * 2) + 'px';
          canvas.style.height = (canvas.height * 2) + 'px';
          this.lore.controls.setZoom(zoom * 2);

          setTimeout(() => {
            let blob = this.lore.canvas.toBlob(blob => {
              let a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.setAttribute('download', 'export.png');
              a.click();
              
              setTimeout(() => {
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                lore.controls.setZoom(zoom);
              }, 2000);
            });
          }, 2000);
        });

        this.el.download.addEventListener('click', e => {
          e.preventDefault();

          let text = ''
          this.selectedItems.forEach(item => {
            let phIndex = this.ohIndexToPhIndex[item.source];
            let meta = this.scatterMeta[phIndex];
            let phName = this.ohIndexToPhName[item.source];
            let seriesState = this.seriesState[phName];

            let fullLabel = data[phName].labels[item.item.index].split('__');

            let labelIndex = meta.label_index[seriesState];
            let titleIndex = meta.title_index[seriesState];
            let selectedLabels = meta.selected_labels[seriesState];

            fullLabel.forEach((l, i) => {
              text += l + ';'
            });
            text = text.slice(0, -1); 
            text += '\n';
          });

          var a = document.createElement('a');
          a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
          a.setAttribute('download', 'faerun_list.csv');

          a.style.display = 'none';
          document.body.appendChild(a);

          a.click();

          document.body.removeChild(a);

          return false;
        });

        this.el.largepreview.addEventListener('click', e => {
          
          //Switch display mode:
          if (FullMolinBkg == false) {
            FullMolinBkg = true;
          } else {
            FullMolinBkg = false;
            //HIDE BIG CANVAS IN BACKGROUND:
            document.getElementById("overlay-structure-container").style.visibility = "hidden";
          }
        });
      }

      setTipContent__() {
        SmilesDrawer.parse(this.currentPoint.label, tree => {
          smilesDrawer.draw(tree, 'smiles-canvas', 'light', false);
          let tipImage = Faerun.createElement('img');
          tipImage.src = this.el.smilesCanvas.toDataURL();
          this.el.tipText.innerHTML = '';
          if (this.currentPoint.titleIndex !== this.currentPoint.labelIndex)
            this.el.tipText.innerHTML = `${this.currentPoint.fullLabel[this.currentPoint.titleIndex]}<br />`;
          this.el.tipText.appendChild(tipImage);
          this.el.tip.style.borderColor = this.currentPoint.color;
        }, err => { console.log(err); });
      }

      setTipContent() {
        SmilesDrawer.parse(this.currentPoint.label, tree => {
          smilesDrawer.draw(tree, 'overlay-structure', 'dark', false);
          document.getElementById("tip").style.visibility = "hidden";
          //let tipImage = Faerun.createElement('img');
          //tipImage.src = this.el.smilesCanvas.toDataURL();
          //this.el.tipText.innerHTML = '';
          //if (this.currentPoint.titleIndex !== this.currentPoint.labelIndex)
          //  this.el.tipText.innerHTML = `${this.currentPoint.fullLabel[this.currentPoint.titleIndex]}<br />`;
         // this.el.tipText.appendChild(tipImage);
          //this.el.tip.style.borderColor = this.currentPoint.color;
        }, err => { console.log(err); });
      }

      setSelectedContent(fullLabel, labelIndex, selectedLabels, img) {
        this.el.selectedContainer.innerHTML = '';
        if (img)
          this.el.selectedContainer.appendChild(img);

        fullLabel.forEach((l, i) => {
          if (i === labelIndex) return;
          if (selectedLabels && selectedLabels[i]) {
            this.el.selectedContainer.appendChild(
              Faerun.createElement('div', { classes: 'label', content: selectedLabels[i] })
            );
          }
          this.el.selectedContainer.appendChild(
            Faerun.createElement('div', { classes: 'content', content: l })
          );
        });

        // Update the indicator
        this.updateSelectedIndicators();
      }

      renderLegend() {
        if (!this.legend.show) return;

        //MODIFIED get the sunburst to append it to the legend down under
        let sunburst = document.getElementById("sunburst");

        let legend = document.getElementById('legend');
        
        if (legend) this.body.removeChild(legend);

        legend = Faerun.createElement('div', { id: 'legend' });
        this.body.appendChild(legend)
        
        if (this.legend.title && this.legend.title !== '')
          legend.appendChild(Faerun.createElement('h2', { content: 'Legend' }));
        
        let container = Faerun.createElement('div', { classes: 'container' });
        legend.appendChild(container);

        this.scatterMeta.forEach(s => {
          let index = this.seriesState[s.name];
          if (s.has_legend) {
            let legendSection = []
            if (!s.is_range[index]) {
              s.legend[index].forEach(v => {
                legendSection.push(Faerun.createElement('div', { classes: 'legend-element' }, [
                  Faerun.createColorBox(v[0]),
                  Faerun.createElement('div', { classes: 'legend-label', content: v[1] }),
                ]))
              })
            } else {
              legendSection.push(Faerun.createElement('div', { classes: 'legend-element-range' }, [
                ...Faerun.createColorScale(s.legend[index]),
                Faerun.createElement('div', { 
                  classes: 'legend-label max', 
                  content: s.max_legend_label[index] 
                }),
                Faerun.createElement('div', {
                  classes: 'legend-label min',
                  content: s.min_legend_label[index] 
                })
              ]))
            }

            let series = [];
            for (var i = 0; i < s.series_title.length; i++) {
              series.push(
                Faerun.createElement('option', { 
                  value: i, 
                  content: s.series_title[i], 
                  selected: i === index
                })
              );
            }


            let sectionHeader = Faerun.createElement(
              'h3', { content: s.legend_title[index] }
            );
            sectionHeader.addEventListener('click', e => {
              this.toggleLegendSection(s.name);
            });

            let seriesSelector = Faerun.createElement(
              'select', 
              { 
                id: `select-${s.name}`, 
                classes: 'series-selector',
                'data-name': s.name,
                hidden: s.series_title.length < 2,
              }, 
              [ ...series ]
            );
            seriesSelector.addEventListener('change', e => {
              let value = document.getElementById(`select-${s.name}`).value;
              this.changeSeries(value, s.name);
            });

          //MODIFIED adding Sunburst
            container.appendChild(
                sunburst
            ); 

            container.appendChild(
              Faerun.createElement(
                'div', { id: `legend-${s.name}`, 
                classes: 'legend-section', 
                'data-name': `${s.name}` },
                [ sectionHeader, seriesSelector, ...legendSection ]
              )
            );


         
          }
        });
      }

      toggleLegendSection(name) {
        let section = document.getElementById('legend-' + name);
        let geometry = this.pointHelpers[this.phIndexMap[name]].geometry;
        let isVisible = geometry.isVisible;

        if (isVisible) {
          geometry.hide();
          section.style.opacity = 0.5;
        } else {
          geometry.show();
          section.style.opacity = 1.0;
        }
      }

      getSelectedIndex(source, index) {
        let selectedIndex = null;
        this.selectedItems.forEach((item, i) => {
          if (item.source == source && item.item.index == index) {
            selectedIndex = i;
            return;
          }
        });
        return selectedIndex;
      }

      updateSelected(current = -1) {
        let n = this.selectedItems.length
        // Hide the container if no items are selected
        if (n === 0) {
          this.el.selected.style.display = 'none';
          return;
        } else {
          this.el.selected.style.display = 'block';
        }

        if (current < 0) current = n - 1;
        if (current >= n) current = 0;
        this.selectedCurrent = current;

        let item = this.selectedItems[current];

        let phIndex = this.ohIndexToPhIndex[item.source];
        let meta = this.scatterMeta[phIndex];
        let phName = this.ohIndexToPhName[item.source];
        let seriesState = this.seriesState[phName];

        let fullLabel = data[phName].labels[item.item.index].split('__');

        let labelIndex = meta.label_index[seriesState];
        let titleIndex = meta.title_index[seriesState];
        let selectedLabels = meta.selected_labels[seriesState];

        SmilesDrawer.parse(fullLabel[labelIndex], tree => {
          smilesDrawer.draw(tree, 'smiles-canvas', 'dark', false);
          let img = Faerun.createElement('img');
          img.src = this.el.smilesCanvas.toDataURL();
          
          this.el.selectedCurrent.innerHTML = current + 1;
          this.el.selectedTotal.innerHTML = n;
          this.el.selectedTitle.innerHTML = fullLabel[titleIndex];

          this.setSelectedContent(fullLabel, labelIndex, selectedLabels, img);
        }, err => { console.log(err); });

        // Remove all indicators
        this.selectedIndicators.forEach(indicator => {
          indicator.element.parentElement.removeChild(indicator.element);
        });
        this.selectedIndicators.length = 0;

        // Add the indicator for this object
        let indicatorElement = Faerun.createElement(
          'div', 
          { classes: 'selected-indicator' },
          [
            Faerun.createElement('div', { classes: 'crosshair-x' }),
            Faerun.createElement('div', { classes: 'crosshair-y' })
          ]
        );

        this.body.appendChild(indicatorElement);
        this.selectedIndicators.push({
          element: indicatorElement,
          index: item.item.index,
          ohIndex: item.source,
          phIndex: phIndex
        });
        this.updateSelectedIndicators();
      }

      updateSelectedIndicators() {
        this.selectedIndicators.forEach(indicator => {
          let pointSize = this.pointHelpers[indicator.phIndex].getPointSize();
          let screenPosition = this.octreeHelpers[indicator.ohIndex]
                                   .getScreenPosition(indicator.index);
          
          // Make the crosshairs larger than the point
          pointSize = Faerun.getMax([pointSize / window.devicePixelRatio, 10 / window.devicePixelRatio]);
          pointSize *= 1.25;
          let halfPointSize = pointSize / 2.0;
          indicator.element.style.left = (screenPosition[0] - halfPointSize) + 'px';

          // ADDED +181 to adjust position
          indicator.element.style.top = (screenPosition[1] - halfPointSize + 181) + 'px';
          indicator.element.style.width = pointSize + 'px';
          indicator.element.style.height = pointSize + 'px';
        });
      }

      updateTitle(first = false) {
        if (this.el.title === undefined) return;

        let bb = this.el.title.getBoundingClientRect();
        let scenePosition = new Lore.Math.Vector3f(
          (this.min[0] + this.min[0]) / 2.0, this.min[1], 
          (this.min[2] + this.min[2]) / 2.0
        );

        let screenPosition = this.lore.controls.camera.sceneToScreen(scenePosition, this.lore);
        
        this.el.title.style.left = (screenPosition[0] - (bb.width / 2.0)) + 'px';
        this.el.title.style.top = (screenPosition[1] - bb.height) + 'px';

        if (first) this.el.title.classList.add('show');
      }

      updateXAxis(first = false) {
        if (this.el.xAxis === undefined) return;
        
        let bb = this.el.xAxis.getBoundingClientRect();
        let scenePosition = new Lore.Math.Vector3f(
          (this.min[0] + this.min[0]) / 2.0, this.min[1], 
          (this.min[2] + this.min[2]) / 2.0
        );

        let screenPosition = this.lore.controls.camera.sceneToScreen(scenePosition, this.lore);
        
        this.el.xAxis.style.left = (screenPosition[0] - (bb.width / 2.0)) + 'px';
        this.el.xAxis.style.top = (screenPosition[1]) + 'px';

        if (first) this.el.xAxis.classList.add('show');
      }

      updateYAxis(first = false) {
        if (this.el.yAxis === undefined) return;
          
        let bb = this.el.yAxis.getBoundingClientRect();
        let scenePosition = new Lore.Math.Vector3f(
          this.min[0], (this.min[1] + this.min[1]) / 2.0, 
          (this.min[2] + this.min[2]) / 2.0
        );
        
        let screenPosition = this.lore.controls.camera.sceneToScreen(scenePosition, this.lore);
        
        this.el.yAxis.style.left = (screenPosition[0] - bb.height) + 'px';
        this.el.yAxis.style.top = (screenPosition[1] - bb.width / 2.0) + 'px';

        if (first) this.el.yAxis.classList.add('show');
      }

      changeSeries(value, name) {
        value = parseInt(value);
        this.seriesState[name] = value;
        this.renderLegend();

        this.pointHelpers[this.phIndexMap[name]].setRGBFromArrays(
          data[name]['colors'][value].r, 
          data[name]['colors'][value].g, 
          data[name]['colors'][value].b
        );

        if (data[name]['s']) {
          if (data[name]['s'][value]) {
            this.pointHelpers[this.phIndexMap[name]].setSize(
              data[name]['s'][value]
            );
          } else {
            this.pointHelpers[this.phIndexMap[name]].setSize(1.0);
          }
        }
      }

      search(term) {
        let results = {}
        let re = new RegExp(term, 'i');

        Object.keys(data).forEach(name => {
          if (!('labels' in data[name])) return;
          results[name] = []
          data[name]['labels'].forEach((label, i) => {
            if (re.test(label))
              results[name].push(i)
          });
        });

        return results;
      }

      static createColorBox(value) {
        return Faerun.createElement(
          'div', 
          { 
            classes: 'color-box', 
            style: `background-color: rgba(${value[0] * 255}, ${value[1] * 255 }, ${value[2] * 255 }, ${value[3] });
                    border-color: rgba(${value[0] * 255 }, ${value[1] * 255 }, ${value[2] * 255 }, ${value[3] })`
          }
        );
      }

      static createColorScale(values) {
        let scale = [];

        values.forEach(value => {
          scale.push(
            Faerun.createElement(
              'div', 
              { 
                classes: 'color-stripe', 
                style: `background-color: rgba(${value[0][0] * 255}, ${value[0][1] * 255}, ${value[0][2] * 255}, ${value[0][3]});
                        border-color: rgba(${value[0][0] * 255}, ${value[0][1] * 255}, ${value[0][2] * 255}, ${value[0][3]})`,
                alt: value[1]
              }
            ),
          )
        });

        return scale;
      }
      
      static createElement(tag, values = {}, children = []) {
        let element = document.createElement(tag);

        for (const key of Object.keys(values)) {
          if (key === 'classes')
            element.classList.add(...values[key].split(' '));
          else if (key === 'content')
            element.innerHTML = values[key];
          else if (key === 'hidden') {
            if (values[key])
              element.setAttribute('hidden', true);
          }
          else if (key === 'selected') {
            if (values[key])
              element.setAttribute('selected', true);
          }
          else
            element.setAttribute(key, values[key]);
        }

        if (children) {
          if (Array.isArray(children)) {
            children.forEach(child => {
              element.appendChild(child);
            })
          } else {
            element.appendChild(children);
          }
        }

        return element;
      }

      static bindElements() {
        let result = {};
        document.querySelectorAll('[data-bind]').forEach(e => {
          result[e.getAttribute('data-bind')] = e;
        });
        return result;
      }

      static getMin(arr, other = Number.MAX_VALUE) {
        let m = Number.MAX_VALUE;
        for (var i = 0; i < arr.length; i++)
            if (arr[i] < m) m = arr[i];
        
        if (m < other) return m;
        return other;
      }

      static getMax(arr, other = -Number.MAX_VALUE) {
        let m = -Number.MAX_VALUE;
        for (var i = 0; i < arr.length; i++)
            if (arr[i] > m) m = arr[i];
        
        if (m > other) return m;
        return other;
      }
    }

    let f = new Faerun();
  

  }