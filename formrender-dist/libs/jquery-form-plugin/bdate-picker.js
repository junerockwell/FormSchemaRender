/*!
 * jQuery Birthday Picker: v1.4 - 10/16/2011
 * http://abecoffman.com/stuff/birthdaypicker
 *
 * Copyright (c) 2010 Abe Coffman
 * Dual licensed under the MIT and GPL licenses.
 *
 */

(function(e){var t={"short":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"short-sp":["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],"long":["January","February","March","April","May","June","July","August","September","October","November","December"]},n=new Date,r=n.getFullYear(),i=n.getMonth()+1,s=n.getDate();e.fn.birthdaypicker=function(n){n&&typeof n=="string"&&(n=e.parseJSON(n));var i={maxage:120,minage:0,futuredates:!1,maxyear:r,minyear:"",dateformat:"middleEndian",monthformat:"short",placeholder:!0,legend:"",defaultdate:!1,fieldname:"birthdate",fieldid:"birthdate",hiddendate:!0,onchange:null,tabindex:null,required:!1,errorname:"",id:"",mindate:"",maxdate:"",lang:""};return this.each(function(){n&&(_.each(n,function(e,t){delete n[t],n[t.toLowerCase()]=e}),e.extend(i,n));if(i.mindate!==""){var s=i.mindate.split("/");s.length===3&&(i.minyear=s[2])}var o=i.required?" required":"",u=e("<fieldset class='birthday-picker'></fieldset>"),a=e("<select class='birth-year not_sending' name='"+i.id+"_birth[year]'"+o+"></select>"),f=e("<select class='birth-month not_sending' name='"+i.id+"_birth[month]'"+o+"></select>"),l=e("<select class='birth-day not_sending' name='"+i.id+"_birth[day]'"+o+"></select>");i.legend&&e("<legend>"+i.legend+"</legend>").appendTo(u),i.id!==""&&(i.fieldid=i.id,i.fieldname=i.id),i.lang!==""&&(i.monthformat="short-"+i.lang);var c=i.tabindex;i["dateformat"]=="bigEndian"?(u.append(a).append(f).append(l),c!=null&&(a.attr("tabindex",c),f.attr("tabindex",c++),l.attr("tabindex",c++))):i["dateformat"]=="littleEndian"?(u.append(l).append(f).append(a),c!=null&&(l.attr("tabindex",c),f.attr("tabindex",c++),a.attr("tabindex",c++))):(u.append(f).append(l).append(a),c!=null&&(f.attr("tabindex",c),l.attr("tabindex",c++),a.attr("tabindex",c++)));if(i.placeholder){var h,p,d;switch(i.lang){case"sp":p="Mes",h="A&ntilde;o",d="D&iacute;a";break;default:p="Year",h="Month",d="Day"}e("<option value=''>"+p+":</option>").appendTo(a),e("<option value=''>"+h+":</option>").appendTo(f),e("<option value=''>"+d+":</option>").appendTo(l)}var v,m,g,y,b,w;i.defaultdate?(m=i.defaultdate.split("/"),e.isArray(m)&&m.length===3?(g=new Date(m[2],m[0]-1,m[1]),y=g.getFullYear(),b=g.getMonth()+1):(g=new Date(i.defaultdate+"T00:00:00"),y=g.getFullYear(),b=g.getMonth())):(g=new Date,y=g.getFullYear()-1,b=g.getMonth()+1),w=g.getDate(),b=b<10?"0"+b:b,w=w<10?"0"+w:w,v=b+"/"+w+"/"+y,i.hiddendate&&e("<input type='hidden' name='"+i.fieldname+"'/>").attr("id",i.fieldid).val(v).appendTo(u);var E=r-i.minage,S=i.minyear!==""?i.minyear:r-i.maxage;i.futuredates&&i["maxyear"]!=r&&(i.maxyear>1e3?E=i.maxyear:E=r+i.maxyear);for(var x=E;x>=S;x--)e("<option></option>").attr("value",x).text(x).appendTo(a);for(var T=0;T<12;T++)e("<option></option>").attr("value",T+1).text(t[i.monthformat][T]).appendTo(f);for(var N=1;N<32;N++)e("<option></option>").attr("value",N).text(N).appendTo(l);e(this).append(u);if(i.defaultdate){var C;e.isArray(m)&&m.length===3?C=new Date(m[2],m[0]-1,m[1]):C=new Date(i.defaultdate+"T00:00:00"),a.val(C.getFullYear()),f.val(C.getMonth()+1),l.val(C.getDate())}u.change(function(){var n=new Date,r=n.getFullYear(),s=n.getMonth()+1,o=n.getDate(),u=parseInt(a.val(),10),c=parseInt(f.val(),10),h=parseInt(l.val(),10),p=(new Date(u,c,0)).getDate(),d=parseInt(f.children(":last").val()),m=parseInt(l.children(":last").val());if(m>p)while(m>p)l.children(":last").remove(),m--;else if(m<p)while(m<p)m++,l.append("<option value="+m+">"+m+"</option>");if(!i.futuredates&&u==E){if(d>s){while(d>s)f.children(":last").remove(),d--;l.children(":first").attr("selected","selected")}if(c===s)while(m>o)l.children(":last").remove(),m-=1}if(u!=E&&d!=12)while(d<12)f.append("<option value="+(d+1)+">"+t[i.monthformat][d]+"</option>"),d++;u*c*h!=0&&(c=c<10?"0"+c:c,h=h<10?"0"+h:h,v=c+"/"+h+"/"+u,e(this).find("#"+i.fieldid).val(v),i["onchange"]!=null&&i.onchange(v))})})}})(jQuery);