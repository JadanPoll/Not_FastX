import { Component, OnInit, ChangeDetectorRef, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserConfigService } from '@Common/config';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NetworkAutodetectService, IframeService, HighQualityUpgradesService, CODEC, CAP, CapabilitiesService, SettingsService, FrameRateService,
   BigBlockService,  CompressionService, SmallBlockService, BigBlockSizeService, GeometryService,
} from '../../starnet';
import { StorageService } from '../../storage';
import { ScalingService } from 'client/src/app/starnet/settings/scaling.service';
import { IgnoreFrameService } from "../../local-settings";
import { DEFAULT_SETTINGS, SETTINGS } from 'client/src/app/constants';
import { LocalResizeService } from '../../local-settings/local-resize.service';


const DISPLAY_CODECS = [CODEC.JPEG, CODEC.PNG, CODEC.WEBP];

const CODEC_MAP = {
  [CODEC.JPEG]: "JPEG: Best balance of image quality and bandwidth",
  [CODEC.PNG]: "PNG: Best image quality, highest bandwidth",
  [CODEC.WEBP]: "WebP: Lowest bandwidth, colors may appear darker"
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: []
})
export class SettingsComponent implements OnInit {
  RESIZE_FIT = 'fit';
  RESIZE_ZOOM = 'zoom';
  RESIZE_OFF = '';
  codecs = [];
  clientSettingsArray = [];
  cs$;ß
  ss$
  ucs$
  sub$;
  ig$;
  networkAutodetect;
  autoadjust;
  ignore;
  compression = {
    min: 1,
    max: 5,
    current: 5,
    step: 1
  }
  frameRate = {
    min: 1,
    max: 120,
    current: 30,
    step: 1
  }

  sc$;

  highQualityUpgrades = true;
  smallBlockCodec = 3;
  bigBlockCodec = 3;
  blocks = [
    { width: 64, height: 64 },
    { width: 128, height: 128 },
    { width: 192, height: 192 },
    { width: 256, height: 256 },
    { width: 512, height: 512 },
    { width: 1024, height: 1024 },
  ];
  
  blockSize = this.blocks [0];
  ignoreFrame = false; //local
  autoscale = true; //local
  scaling = { //local
    min: 0.1,
    max: 3.0,
    current: 1,
    step: 0.1,
    autoscale: true
  }
  zoom = this.RESIZE_OFF;
  scales = [
    { name: 'Fit to window', value: this.RESIZE_FIT },
    { name: '0.5x', value: 0.5 },
    { name: '0.75x', value: 0.75 },
    { name: '1x', value: 1.0 },
    { name: '1.25x', value: 1.25 },
    { name: '1.5x', value: 1.5 },
    { name: '1.75x', value: 1.75 },
    { name: '2x', value: 2.0 },

  ]
  scalingDisabled = this.RESIZE_OFF;
  mySettings = {} as any;
  customSettingsId = "";
  @Output() customSettingsIdChanged = new EventEmitter();
 
  constructor(private modalService: NgbModal, 
    private na: NetworkAutodetectService, 
    private frame: IframeService, 
    private cs: CapabilitiesService,
    private route: ActivatedRoute,
    private settings: SettingsService,
    private ss: StorageService,
    private user: UserConfigService,
    private frs: FrameRateService,
    private ifs: IgnoreFrameService,
    private storeService: StorageService,
    private hqs: HighQualityUpgradesService, 
    private sbs: SmallBlockService,
    private bbs: BigBlockService,
    private bbss: BigBlockSizeService,
    private scalingService: ScalingService,
    private localResize: LocalResizeService,
    private ignoreService: IgnoreFrameService,
    private comp: CompressionService,
    private cdr: ChangeDetectorRef) {}
  ngOnInit () {
    this.cs$ = this.cs.getSubject().subscribe((d:any) => {
      
      this.codecs = (d.get(CAP.MULTI_CODEC) || { codecIds: []})
      .codecIds
      .sort()
      .filter(c => CODEC_MAP[c])
      .map(c => ({ id: c, name: CODEC_MAP[c] }));  
      console.log('capabilities', d);
      console.log('codecs', this.codecs)
    }); 
    this.ss$ = this.settings.getSubject().subscribe(d => {
      this.mySettings = d;
      this.updateChanges(this.mySettings);
      this.cdr.detectChanges();
    });
    this.customSettingsId = this.ss.get('customSettings') || "__custom__";

    this.ucs$ = this.user.subscribe(d => {
      this.clientSettingsArray = d.clientSettings || [];
	
      this.clientSettingsArray.push({
        _id: "__system_defaults__",
        name: "System Defaults",
        compression: 5,
        smallBlockImageFormat: 3,
        bigBlockImageFormat: 3,
        highQualityUpgrades: true,
        smartScaling: true,
        automaticAdjust: true
      } as any);
      this.cdr.detectChanges();
    });
    this.user.load();

    this.customSettingsIdChanged.subscribe(e => {
        this.onCustomSettingsUpdate(e);
    });

    this.scalingService.getSubject().subscribe((ss:any) => {
      this.scaling = ss;
      this.autoscale = this.scaling.autoscale;
      this.zoom = this.scaling.autoscale ? this.RESIZE_FIT : this.scaling.current as any;
      this.cdr.detectChanges();
    });

    this.ifs.getSubject().subscribe(d => {
      this.ignoreFrame = d.enabled;
      this.cdr.detectChanges();
    });
    

  }
  ngOnDestroy() {
    this.cs$.unsubscribe();
    this.ss$.unsubscribe();
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      this.frame.focus ();
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.frame.focus ();
    });
  }
  showBlocks() {
    return ('ImageBitmap' in window) && ('createImageBitmap' in window);
  }
  onCustomSettingsUpdate($event) {
    this.customSettingsId = $event;

    this.ss.set('customSettings', $event);
  }
  getCustomSettingsId() {
    return this.customSettingsId;
  }
  onSettingsChange($event) {
   
    this.customSettingsIdChanged.emit(this.customSettingsId)

    if(!this.customSettingsId) {
       return;
    } else if(this.customSettingsId === '__custom__') {
      return;
    }
    let cl = this.clientSettingsArray.find(c => c._id === this.customSettingsId);

   
    if(!cl)
      return;

    if(cl.hasOwnProperty('compression')) {
      this.compression.current = cl.compression;
      this.comp.send(this.compression);
    }
     
    if(cl.hasOwnProperty('frameRate')) {
      this.frameRate.current = cl.frameRate;
      this.frs.send(this.frameRate);;
    }
    
    if(cl.hasOwnProperty('automaticAdjust'))
      this.na.send({ enabled: cl.automaticAdjust });

    if(cl.hasOwnProperty('ignoreFrame')) {
      this.ifs.send({ enabled: cl.ignoreFrame });
      this.ignoreFrame = cl.ignoreFrame;
    }
    
    if(cl.hasOwnProperty('highQualityUpgrades')) {
      this.highQualityUpgrades = cl.highQualityUpgrades;
      this.hqs.send({ enabled: cl.highQualityUpgrades });
    }
    
    // if(cl.hasOwnProperty('smallBlockImageFormat')) {
    //   this.smallBlockCodec = cl.smallBlockImageFormat;
    //   this.sbs.send({ codecId: cl.smallBlockImageFormat });
    // }
     
    if(cl.hasOwnProperty('bigBlockImageFormat')) {
      this.bigBlockCodec = cl.bigBlockImageFormat;
      this.bbs.send({ codecId: cl.bigBlockImageFormat }); 
      this.sbs.send({ codecId: cl.smallBlockImageFormat });
    }
     
    // if(cl.hasOwnProperty('bigBlockMinimumSize')) {
    //   let b = cl.bigBlockMinimumSize.split('x');
    //   if(b.length === 2)
    //     this.bbss.send({ width: parseInt(b[0], 10), height: parseInt(b[1], 10 )});
    // }

    if(cl.hasOwnProperty('smartScaling')) {
      if(cl.smartScaling) {
        this.zoom = cl.smartScaling ? this.RESIZE_FIT : (cl.scaling || 1.0)
        this.scalingService.send({ 
          autoscale: cl.smartScaling });
      } else {
        this.zoom = cl.scaling || 1.0;
        this.scalingService.send({ 
          current: cl.scaling || 1.0,
          autoscale: cl.smartScaling 
        });
      }
    }
    this.updateScaling();
  }
 

  getDisabled() {
    return !this.customSettingsId;
  }
  updateChanges(settingsChanges) {
    if(settingsChanges[SETTINGS.HIGH_QUALITY_UPGRADES])
        this.highQualityUpgrades = settingsChanges[SETTINGS.HIGH_QUALITY_UPGRADES].enabled;
      if(settingsChanges[SETTINGS.SMALL_BLOCK_FORMAT])
        this.smallBlockCodec = settingsChanges[SETTINGS.SMALL_BLOCK_FORMAT].codecId;
      if(settingsChanges[SETTINGS.BIG_BLOCK_FORMAT])
        this.bigBlockCodec = settingsChanges[SETTINGS.BIG_BLOCK_FORMAT].codecId;
      if(settingsChanges[SETTINGS.BIG_BLOCK_MIN_SIZE]) {
        let b = this.blocks.findIndex(c => {
          return settingsChanges[SETTINGS.BIG_BLOCK_MIN_SIZE] &&
          c.width === settingsChanges[SETTINGS.BIG_BLOCK_MIN_SIZE].width &&
          c.height === settingsChanges[SETTINGS.BIG_BLOCK_MIN_SIZE].height 
        });
      if(b >= 0)
        this.blockSize = this.blocks[b];
      }
      if(settingsChanges[SETTINGS.AUTOMATIC_ADJUST]) {
       
        this.autoadjust = settingsChanges[SETTINGS.AUTOMATIC_ADJUST].enabled;
      }
     

      Object.assign(this.compression, settingsChanges[SETTINGS.COMPRESSION] || {});
      Object.assign(this.frameRate, settingsChanges[SETTINGS.FRAME_RATE] || {});
      this.cdr.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges) {
    const settingsChanges: SimpleChange = changes.settings;
    if(settingsChanges) {
      this.updateChanges(settingsChanges.currentValue);
    }
    


    const settingsId: SimpleChange  = changes.customSettingsId;

    if(settingsId) {
      let cl = this.clientSettingsArray.find(c => c._id === settingsId.currentValue);
      if(cl) {
        if(cl.hasOwnProperty('automaticAdjust'))
          this.na.send({
            enabled: cl.automaticAdjust
          });
        
        if(cl.hasOwnProperty('compression')) {
          this.compression.current = cl.compression;
          this.comp.send(this.compression);
        }
        
        if(cl.hasOwnProperty('frameRate')) {
          this.frameRate.current = cl.frameRate;
          this.frs.send(this.frameRate);
        }
          
        if(cl.hasOwnProperty('highQualityUpgrades')) {
          this.highQualityUpgrades = cl.highQualityUpgrades;
          this.hqs.send({ enabled: cl.highQualityUpgrades });
        }
        
        // if(cl.hasOwnProperty('smallBlockImageFormat')) {
        //   this.smallBlockCodec = cl.smallBlockImageFormat;
        //   this.sbs.send({ codecId: cl.smallBlockImageFormat });
        // }
         
        if(cl.hasOwnProperty('bigBlockImageFormat')) {
          this.bigBlockCodec = cl.bigBlockImageFormat;
          this.bbs.send({ codecId: cl.bigBlockImageFormat });
          this.sbs.send({ codecId: cl.bigBlockImageFormat }); 
        }
         
        // if(cl.hasOwnProperty('bigBlockSize')) {
        //   let b = cl.bigBlockSize.split('x');
        //   if(b.length === 2)
        //     this.bbss.send({ width: parseInt(b[0], 10), height: parseInt(b[1], 10 )});
        // }
  
        if(cl.hasOwnProperty('scaling')) {
          this.scaling.current = cl.scaling;
          this.scalingService.send(this.scaling);
        }
          
       
        if(cl.hasOwnProperty('smartScaling')) {
          this.scaling.autoscale = cl.smartScaling;
          this.scalingService.send(this.scaling);
        }else
          this.scaling.autoscale = (this.storeService.get("scale") || {}).autoscale;
        
        if(cl.hasOwnProperty('ignoreFrame'))
        {
          this.ignoreService.send({ enabled: cl.ignoreFrame });
          this.ignoreFrame = cl.ignoreFrame;
        }
        //   this.ignoreFrame = cl.ignoreFrame;
        // else
        //   this.ignoreFrame = this.ignoreService.current().enable;
       
      } else {
          this.scaling.autoscale = (this.storeService.get("scale") || {}).autoscale;
          this.ignoreFrame = this.ignoreService.current().enabled; 
      }
    }

    this.autoscale = this.scaling.autoscale;

    this.cdr.detectChanges(); 
    
  }
  // getDisabled() {
  //   return this.enableCustom;
  // }
  // showBlocks() {
  //   return this.canShowBlocks;
  // }
  updateCompression(cur) {
    this.customSettingsIdChanged.emit('__custom__');
    this.comp.send(this.compression);
  }
  updateFrameRate(cur) {
    this.customSettingsIdChanged.emit('__custom__');
    this.autoadjust = false;
    this.na.send({
      enabled: false
    });
    this.frs.send({
      current: cur
    });
  }
  sendHighQuality(up) {
    this.customSettingsIdChanged.emit('__custom__');
    this.hqs.send({ enabled: up });
  }
  sendSmallBlock(codecId) {
    this.customSettingsIdChanged.emit('__custom__');
    this.sbs.send({ codecId: codecId });
  }
  sendBigBlock(codecId) {
    this.customSettingsIdChanged.emit('__custom__');
    this.bbs.send({ codecId: codecId });
    this.sbs.send({ codecId: codecId });
  }
  sendBigBlockSize(size) {
    this.customSettingsIdChanged.emit('__custom__');
    this.bbss.send(size);
  }
  saveSmartScaling(autoscale) {
    this.customSettingsIdChanged.emit('__custom__');
    this.scaling.autoscale = autoscale;
    this.scalingService.send(this.scaling);
  }
  saveIgnore(ig) {
    this.customSettingsIdChanged.emit('__custom__');
    this.ignoreService.send({ enabled: ig });
  }
  saveScaling(cur) {
    this.customSettingsIdChanged.emit('__custom__');
    this.scaling.autoscale = false;
    this.autoscale = false;
    this.scalingService.send(this.scaling); 
  }
  saveAutoAdjust(a) {
    this.customSettingsIdChanged.emit('__custom__');
    this.na.send({
      enabled: a
    });
  }
  updateScaling() {
    let f = this.frame.getFrame();
    if(this.zoom === 'fit') {
      this.scaling.autoscale = true;
     
      let w = (window.innerHeight / f.scrollHeight) * f.scrollWidth;
      let h = window.innerHeight;
      f.style.width = w + 'px';
      f.style.height = h + 'px';
    } else {
      this.scaling.autoscale = false;
      this.scaling.current = Number(this.zoom ? this.zoom : 1.0);
    }
    this.scalingService.send(this.scaling);  
  }
  disableScaling($event?) {
    if($event)
      this.scalingDisabled = $event;
   return this.scalingDisabled === this.RESIZE_FIT;
  }
  isScalingDisabled(val) {
    return (this.scalingDisabled === this.RESIZE_FIT) && (val === this.scalingDisabled)
  }
}
