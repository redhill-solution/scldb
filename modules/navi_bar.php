<?php				
	function insert_entries($menu_entries = array(	'Belegungsplan', 
													'Autoren', 
													'Mail', 
													'Teilnehmerliste'), 
							$menu_links = array(	"Belegungsplan" 	=> 	"/calendar/calendar.php",
													"Autoren"			=>	"/authors/list.php",
													"Mail"				=>	"/mail/mail.php",
													"Teilnehmerliste" 	=>	"/user/list.php"),
							$menu_sub,
							$menu_sub_links) {
		echo "<ul class='nav_list'>";
		foreach($menu_entries as $key => $value) {
			echo "<li><a href='".$menu_links[$menu_entries[$key]]."'>".$value."</a></li>";
			if(!empty($menu_sub[$menu_entries[$key]])) {
				foreach($menu_sub as $wey => $walue) {
					if($menu_entries[$key] == $wey) {
						for($elmnt_size = 0; $elmnt_size < count($walue); $elmnt_size++) {
							echo "<ul class='sub_menu'><li><a href='".$menu_sub_links[$walue[$elmnt_size]]."'>".$walue[$elmnt_size]."</a></li></ul>";
						}
					}
				}
				//echo $menu_sub[$menu_entries[$key]][0];
				//echo "<ul class='sub_menu'><li><a href='.".$menu_sub_links[$palue[$wey]]."'>".$palue[$wey]."</a></li></ul>";
			}
		}
		echo "</ul>";
	}	
?>
<div id='menu_panel'>
	<div id='navigation'>
        <div id='navi_head'>Navigation</div>
        <div id='navi_bottom'>
        	<a class='start_button' href=<?php echo $_SERVER['PATH_INFO']; ?> >&nbsp;Startseite</a>
			<?php insert_entries($menu_entries_nav,$menu_links_nav,$menu_sub_nav,$menu_sub_links_nav) ?>
        </div>
    </div>
    <div id='settings'>
        <div id='settings_head'>Einstellungen</div>
        <div id='settings_bottom'><?php insert_entries($menu_entries_set,$menu_links_set,$menu_sub_set,$menu_sub_links_set) ?></div>
    </div>
</div>
