<template>
    <el-container class="is-vertical search-resourses">
        <el-row>
            <el-col><h3>{{ title }}</h3></el-col>
            <el-col><p>{{ subtitle }}</p></el-col>
        </el-row>
        <el-row>
            <el-col>
                <div class="search-resourses__input el-input" ref="searchInput">
                    <the-mask @input="onInput" @change="onChange" :class="{ 'mod--error': v_errors.has('searchInput') }"
                              name="searchInput"
                              :data-vv-as="searchTitle"
                              v-validate="{ required : true, min: 5 }"
                              :placeholder="searchTitle"
                              v-model="searchInput"
                              :mask="['#####-####']"
                              class="el-input__inner"
                              autocomplete="off"
                              type="text"/>
                    <span class="search-resourses__input-message"
                          v-if="v_errors.has('searchInput') || errorMessage">
                        {{  v_errors.first('searchInput') || errorMessage }}
                    </span>
                </div>
            </el-col>
        </el-row>
        <el-row class="search-resourses__controls">
            <el-col>
                <el-button class="search-resourses__control" type="primary" @click="onSearch"><i
                        class="fa fa-search"></i>{{L('Search')}}
                </el-button>
                <el-button v-if="isNavGeoLocation" @click="onUseMyLocation" class="search-resourses__control"><i
                        class="fa fa-map-marker big"></i>{{ L('Use My Location') }}
                </el-button>
            </el-col>
        </el-row>
        <div class="resourses__map-wrap-wrap">
            <div ref="googleMapWrap" class="resourses__map-wrap"
                 v-loading="isLoading"
                 element-loading-background="rgba(0, 0, 0, 0.8)"
                 v-if="computedLocations" v-show="mapVisible">
                <div ref="googleMap" class="resourses__map"></div>
                <el-button v-show="goToSearchBtnVisible" class="search-resourses__to-search" type="primary"
                           @click="onBackToSearch">
                    <i class="fa fa-search"></i>{{ backToSearch }}
                </el-button>
            </div>
        </div>
    </el-container>
</template>

<script>
    import axios from 'axios';

    const googleApiKey = 'AIzaSyCg9sRKna21HjY1F_VwDW4HbcT5R5uoyyg';
    let googleApiLang = 'en';
    let googleApiRegion = 'USA';
    let languageAndRegion = `&language=${googleApiLang}&region=${googleApiRegion}`;
    let googleMapApiLoading = false;
    let googleMapApiLoaded = false;

    export default {
        props: {
            title: {
                default: () => {
                    return 'Search resourses';
                }
            },
            subtitle: {
                default: () => {
                    return 'Case search postal code';
                }
            },
            searchTitle: {
                default: () => {
                    return 'search';
                }
            },
            backToSearch: {
                default: () => {
                    return 'Back to search';
                }
            },
            locations: {
                default: () => {
                    return [];
                }
            }
        },
        data() {
            return {
                errorMessage: false,
                loading: true,
                goToSearchBtnVisible: false,
                searchInput: '87500',
                addressInput: 'Mariupol, Ukraine, Myru ave 87',
                postalCodeApiUrl: `https://maps.google.com/maps/api/geocode/json?key=${googleApiKey}${languageAndRegion}`,
                googleMapApiUrl: `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}${languageAndRegion}&callback=initMap`,
                mapVisible: false,
                markers: [],
                mapObjLocal: null,
                domMap: null,
                mapOptions: {
                    zoom: 12,
                    panControl: false,
                    zoomControl: true,
                    mapTypeControl: false,
                    draggable: true,
                    scrollwheel: false,
                    scaleControl: false,
                    streetViewControl: false,
                    overviewMapControl: false,
                    mapTypeId: '',
                    styles: [{
                        "featureType": "all",
                        "elementType": "all",
                        "stylers": [{"saturation": -20}, {"gamma": 0.8}]
                    }]
                },
            }
        },
        mounted() {
            this.domMap = this.$refs.googleMap;
            if (this.domMap) {
                if (!googleMapApiLoaded) {
                    this.$root.$on('googleMapApiLoaded', this.createMapWithMarkers);
                    this.getApi();
                } else {
                    this.createMapWithMarkers();
                }
                if (typeof window !== 'undefined' && $) {
                    $(window).on('scroll resize', this.windowScrollResize)
                }
            }

        },
        destroyed() {
            this.$root.$off('googleMapApiLoaded', this.createMapWithMarkers);
            if (typeof window !== 'undefined' && $) {
                $(window).off('scroll resize', this.windowScrollResize)
            }
        },
        computed: {
            isMarkers() {
                if (!this.markers.length) {
                    // this.errorMessage = this.L('NoSearchResults');
                }else{
                    // this.errorMessage = false;
                }
                return this.markers.length;
            },
            isLoading() {
                return this.loading;
            },
            isNavGeoLocation() {
                if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
                    return true;
                } else {
                    console.log("Geolocation is not supported by this browser.");
                    return false;
                }
            },
            computedLocations() {

                return this.locations;
            }
        },
        methods: {
            onUseMyLocation() {
                let options = {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                };

                // console.log(navigator);

                const error = (err) => {
                    // console.warn(`ERROR(${err.code}): ${err.message}`);
                    this.loading = false;
                };

                if (this.isNavGeoLocation) {
                    this.loading = true;
                    navigator.geolocation.getCurrentPosition(position => {
                        // console.log(`Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`);
                        this.createMarkers(
                            [{
                                lat: position.coords.latitude,
                                long: position.coords.longitude, title: null
                            }]
                        ).then((resolve)=>{
                            this.mapPanTo(position.coords.latitude, position.coords.longitude);
                            this.mapZoomTo(16);
                            this.loading = false;
                        });

                    }, error.bind(this), options);
                }
            },
            inputIsInView() {
                if (!this.$refs.searchInput) {
                    return;
                }
                const $window = $(window);
                const windowTop = $window.scrollTop();
                const windowBottom = windowTop + $window.outerHeight();
                const $input = $(this.$refs.searchInput);
                const inputTop = $input.offset().top;
                const inputBottom = inputTop + $input.outerHeight();

                this.goToSearchBtnVisible = ((windowTop > inputTop) && (windowBottom >= inputBottom));

            },
            windowScrollResize() {
                if (this.mapVisible) {
                    this.inputIsInView();
                }
            },
            onBackToSearch() {
                const scrollEl = this.$el;
                if (scrollEl) {
                    this.scrollTo(this.$refs.searchInput);
                }
            },
            onChange() {
            },
            onInput(val) {
            },
            getApi() {
                if (!googleMapApiLoading && !googleMapApiLoaded) {
                    const el = document.createElement('script');
                    el.setAttribute('type', 'text/javascript');
                    el.setAttribute('async', true);
                    el.setAttribute('src', this.googleMapApiUrl);
                    document.getElementsByTagName('head')[0].appendChild(el);
                }
                if (typeof window !== 'undefined') {
                    window.initMap = () => {
                        googleMapApiLoaded = true;
                        this.$root.$emit('googleMapApiLoaded');
                    };
                }
            },
            resetMarkers(map) {
                const markers = this.markers;
                markers.map((marker, i) => {
                    return marker.setMap(map)
                });
                if (!map) {
                    this.markers = [];
                }

            },
            createMarkers(locations = this.locations, callback = null) {

                return new Promise((resolve, reject) => {

                    if (this.isGoogleApi()) {

                        this.resetMarkers(null);
                        for (let i = 0; i < locations.length; i++) {
                            if (locations[i].lat && locations[i].long) {
                                this.createMarker(locations[i].lat, locations[i].long, locations[i].title || null);
                            }
                        }

                        this.createBoundary();

                        resolve(this.markers);

                    } else {
                        this.loading = false;
                        reject();
                    }
                });

            },
            createMarker(lat, long, title = null, callbacks = null) {
                const contentString = `<div id="content"><b>${title}</b></div>`;

                const infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                let vm = this;
                //let icon = {
                //  url: '/img/pin/pin@2x.png',
                //  scaledSize: new google.maps.Size(38.3, 48)
                //};

                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, long),
                    map: this.mapObjLocal,
                    title: title
                    //icon: icon
                });

                this.markers.push(marker);

                marker.addListener('click', function () {
                    vm.mapPanTo(this.position.lat(), this.position.lng());
                    if (vm.mapObjLocal.getZoom() < 13) {
                        vm.mapZoomTo(vm.mapOptions.zoom + 2);
                    }

                    if (title) {
                        infowindow.open(this.mapObjLocal, marker);
                    }
                });
                if (callbacks) {
                    callbacks();
                }
            },
            createBoundary(markers = this.markers) {
                this.loading = true;
                this.mapOptions.zoom = 8;
                //Create map boundary from marker coordinates
                let newBoundary = new google.maps.LatLngBounds();
                for (let j in markers) {
                    let position = markers[j].position;
                    newBoundary.extend(position);
                }
                if (this.mapObjLocal) {
                    if (this.markers.length > 0 && !this.mapVisible) {
                        $(this.$refs.googleMapWrap).slideToggle(() => {
                            this.mapVisible = true;
                            this.mapObjLocal.fitBounds(newBoundary);
                            this.scrollTo(this.$refs.googleMapWrap);
                        })

                    } else {
                        this.mapObjLocal.fitBounds(newBoundary);
                        this.scrollTo(this.$refs.googleMapWrap);
                    }
                }
                this.loading = false;
            },
            mapZoomTo(zoom) {
                this.mapOptions.zoom = zoom;
                this.mapObjLocal.setZoom(zoom);
            },
            mapPanTo(lat, long) {
                this.mapObjLocal.panTo({lat: lat, lng: long});
            },
            createMap() {
                if (this.isGoogleApi()) {
                    this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
                    this.mapObjLocal = new google.maps.Map(this.domMap, this.mapOptions);
                }
            },
            createMapWithMarkers() {
                if (this.isGoogleApi()) {
                    this.createMap();
                    this.createMarkers().then((markers)=>{
                    });
                }
            },
            onSearch() {
                this.$validator.validateAll().then(valid => {
                    if (valid) {
                        this.geoCodePostal();
                    }
                });
            },
            isGoogleApi() {
                const isGoogleApi = (typeof google !== 'undefined');
                if (!isGoogleApi) {
                    this.getApi()
                }
                return isGoogleApi;
            },
            scrollTo(el, offset = 20, time = 300) {
                const $el = $(el);
                if (!$el.length) {
                    return;
                }
                const $header = $('.m-grid__item.m-header');
                if ($header.length) {
                    offset = offset + $header.outerHeight();
                }

                $("html, body").stop().animate({scrollTop: $el.offset().top - (offset)}, time);
            },
            geoCodePostal() {
                if (!this.isGoogleApi() || !this.mapObjLocal) {
                    return;
                }
                axios.post(`${this.postalCodeApiUrl}&components=postal_code:${this.searchInput}&sensor=false`).then(
                    (response) => {
                        // console.warn(response);
                        if (response.data.error_message) {
                            this.errorMessage = response.data.error_message;
                        } else {
                            this.errorMessage = false;
                        }
                        if (response.data.results) {
                            const res = response.data.results;
                            let newLocations = [];
                            res.map((location, i) => {
                                newLocations.push(
                                    {
                                        lat: location.geometry.location.lat || null,
                                        long: location.geometry.location.lng || null,
                                        title: location.formatted_address || null
                                    }
                                );
                            });
                            if (this.locations !== newLocations) {
                                this.createMarkers(newLocations);
                                this.$emit('update:locations', newLocations);
                            }
                        }
                        if (response.data.error_message) {
                            this.errorMessage = response.data.error_message;
                        } else {
                            this.errorMessage = false;
                        }
                    }
                ).catch(e => {
                    console.warn(e);
                });
            },
            geoCodeAddress() {
                let geocoder = new google.maps.Geocoder();
                let address = this.addressInput;
                geocoder.geocode({'address': address}, (results, status) => {
                    // console.log('results.postcode_localities', results.postcode_localities);
                    if (status == 'OK') {
                        this.mapObjLocal.setCenter(results[0].geometry.location);

                        const marker = new google.maps.Marker({
                            map: this.mapObjLocal,
                            position: results[0].geometry.location
                        });
                        this.mapZoomTo(15);
                    } else {
                        console.warn('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        },

    }
</script>
<style lang="scss">

    .search-resourses {
        padding: 20px;
    }

    .search-resourses__input {
        position: relative;
        margin-bottom: 10px;
    }

    .resourses__map-wrap {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;

        margin-top: 20px;
        padding-bottom: 50%;
    }

    .resourses__map {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }

    .search-resourses__control {
        margin-left: 0;
        margin-top: 10px;
    }

    .search-resourses__control:first-of-type {
        margin-right: 10px;
    }

    .search-resourses__to-search {
        position: absolute;
        right: 0;
        bottom: -52px;
        z-index: 2;
    }

    .search-resourses__input-message {
        position: absolute;
        left: 0;
        bottom: - 24px;
        color: #eb2d0d;
        line-height: 1.7;
    }
</style>
