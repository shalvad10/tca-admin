import { Output, EventEmitter, ChangeDetectorRef, OnDestroy, Component } from '@angular/core';
@Component({
    template: ''
  })
export class ComponentBase implements OnDestroy
{
    @Output() onAction :EventEmitter<Object> = new EventEmitter<Object>();

    constructor(private changeRef: ChangeDetectorRef)
    {
        // Languages.instance.registerListener(this);
        // Styles.instance.registerListener(this);
    }

    public ngOnDestroy() {
        // Languages.instance.unregisterListener(this);
    }

    public getWord(key) {
        // return Languages.instance.getWord(key);
    }

    public detectChanges() {
        if (this.changeRef['destroyed'] == false) {
            this.changeRef.detectChanges();
        }
    }

    public select(lang) {
        // Languages.instance.selectLanguage(lang);
    }

    public get selectedLanguage()
    {
        return ''; //Languages.instance.selected;
    }

    public getBackground(name:string)
    {
        return {"background-color": '' /*Styles.instance.getStyle(name)*/};
    }

    public getColor(name: string)
    {
        return {"color": '' /* Styles.instance.getStyle(name)*/};
    }

    public getBorder(name:string)
    {
    return {"border-color":''/*Styles.instance.getStyle(name)*/};
    }

    public getRawColor(name: string)
    {
        return '';// Styles.instance.getStyle(name);
    }

    public onStyleChange(style)
    {
      this.changeRef.detectChanges();
    }

    public onLanguageChange(lang)
    {
      this.changeRef.detectChanges();
    }

    public emitAction(event: string, data: any = null)
    {
        this.onAction.emit( {action: event, data: data} );
    }

    public bubbleAction(e)
    {
        this.onAction.emit(e);
    }
}
