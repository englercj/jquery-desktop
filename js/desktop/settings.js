(function($, window, undefined) {
    window.appSettings = {};
    
    window.appSettings.Desktop = {
        wallpaper: 'imgs/bgs/desktop/abstract-metal.jpg',
        theme: 'dark-hive',
        icons: {
            Settings: {
                text: 'Settings',
                icon: 'http://upload.wikimedia.org/wikipedia/commons/b/b3/Advancedsettings.png',
                clss: 'desktopIcon',
                href: '#settings_panel',
                draggable: true
            },
            Network: {
                text: 'Network',
                icon: 'http://upload.wikimedia.org/wikipedia/commons/7/7a/Crystal_Project_server.png',
                clss: 'desktopIcon',
                href: '#network_panel',
                draggable: true
            },
            Internet: {
                text: 'Internet',
                icon: 'http://upload.wikimedia.org/wikipedia/commons/6/69/Crystal_Project_browser.png',
                clss: 'desktopIcon',
                href: '#browser',
                draggable: true
            }
        },
        iconSize: 32,
        iconSizeSm: 16
    };
    
    window.appSettings.MenuBar = {
        items: {
            Applications: {
                title: 'Applications',
                icon: 'http://upload.wikimedia.org/wikipedia/commons/7/7a/Crystal_Clear_device_blockdevice_new.png',
                href: '#apps',
                items: {
                    Internet: {
                        title: 'Internet Browser',
                        href: '#browser',
                        action: 'open_window'
                    },
                    Terminal: {
                        title: 'Terminal',
                        href: '#terminal'
                    },
                    SFTP: {
                        title: 'Secure FTP',
                        href: '#sftp'
                    }
                }
            },
            Files: {
                title: 'Files',
                icon: 'http://upload.wikimedia.org/wikipedia/commons/3/35/Crystal_Project_kfloppy.png',
                href: '#files',
                items: {
                    HomeFolder: {
                        title: 'Home Folder',
                        href: '#home_folder'
                    },
                    RootFolder: {
                       title: 'Root Folder',
                       href: '#root_folder'
                    },
                    NetworkFolders: {
                        title: 'Network Folders',
                        href: '#network_folders'
                    }
                }
            },
            Search: {
                title: 'Search',
                icon: 'http://upload.wikimedia.org/wikipedia/commons/c/c9/Crystal_Project_find.png',
                href: '#search'
            },
            Help: {
                title: 'Help',
                icon: 'http://upload.wikimedia.org/wikipedia/commons/2/27/Crystal_Project_access.png',
                href: '#help'
            }
        },
        clock: {
            icon: {
                src: 'http://upload.wikimedia.org/wikipedia/commons/6/68/Crystal_Project_alarm.png',
                size: 16
            },
            href: '#clock'
        }
    };
    
    window.appSettings.ProgramBar = {
        icons: {
            ShowDesktop: {
                text: '',
                icon: 'http://upload.wikimedia.org/wikipedia/commons/f/fd/Crystal_Project_desktop.png',
                clss: 'programbarIcon',
                href: '#show_desktop'
            }
        },
        iconSize: 32,
        iconSizeSm: 16
    };
    
})(jQuery, window);