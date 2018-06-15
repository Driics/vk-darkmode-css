// ==UserScript==
// @run-at       document-start
// @name         NightMode for VK
// @version      1.1.0.3
// @description  Adds a nice, black-whity night mode for vk.
// @author       https://vk.com/id71110013
// @homepage     https://github.com/NIK220V/vk-darkmode-css
// @updateURL    https://github.com/NIK220V/vk-darkmode-css/raw/master/vk_darkmode_css.meta.js
// @downloadURL  https://github.com/NIK220V/vk-darkmode-css/raw/master/vk_darkmode_css.user.js
// @match        *://*.vk.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

if (GM_getValue("VKNOptions") == null) GM_setValue("VKNOptions", {'noonline': false, 'silentwrite': false, 'silentread': false, 'silentwatch': false});

var vknopts = GM_getValue("VKNOptions");

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// Цвета, используемые скриптом. В теории можно изменить под свои и создать собственный цвет дизайна.
var colors = {
    very_gray: 'rgba(17, 17, 17, 1)',
    slightly_gray: 'rgba(35, 35, 35, 1)',
    slightly_gray_1: 'rgba(36, 36, 36, 1)',
    slightly_gray_hovered: 'rgba(71, 71, 71, 1)',
    slighterer_gray_hovered: '#5d5c5c',
    okay_gray: 'rgba(136, 136, 136, 1)',
    unread_message: 'rgba(55, 55, 55, 1)',
    read_text: 'rgba(175, 175, 175, 1)',
    linked_gray: '#828282',
    linked_gray_light: '#999999',
    pure_white: 'white',
    grayscale: 'grayscale()'
};

var interval = -1, socalled = 'vkdarkmode';

var css = document.createElement('style');
css.id = socalled;
css.innerText = `
/* == TEXT COLORS == */
body, h1, h2, h3, .module_header .header_top, .profile_info_header_wrap a, .left_count_wrap, .button_gray button, .flat_button.secondary, input.text.ts_input:focus, .page_counter .count, .ui_tab_sel, .ui_tabs .ui_tab_sel, .ui_tabs_box .ui_tab_sel, .wall_module .post_like:hover, .wall_module .post_reply:hover, .wall_module .post_share:hover, .button_blue button.hover, .button_blue button:hover, .flat_button.hover, .flat_button:hover, .fakeinput, .fakeinput~.placeholder .ph_input, div[contenteditable=true], div[contenteditable=true]~.placeholder .ph_input, input.big_text, input.big_text~.placeholder .ph_input, input.dark, input.dark~.placeholder .ph_input, input.search, input.search~.placeholder .ph_input, input.text, input.text~.placeholder .ph_input, textarea, textarea~.placeholder .ph_input, .ui_actions_menu_item, a.groups_messages_block, .page_actions_dd_label, .page_actions_header_inner, .page_actions_item, .page_actions_cont.narrow .page_actions_header_inner, .pv_like, .pv_like_count, .page_doc_row .page_doc_title, .wall_tt, ul.listing li span, .wk_sub_sub_header, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_hovered .nim-dialog--preview, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_hovered .nim-dialog--text-preview, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_unread.nim-dialog_classic .nim-dialog--preview, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_unread.nim-dialog_classic .nim-dialog--text-preview, .nim-dialog:not(.nim-dialog_deleted):hover .nim-dialog--preview, .nim-dialog:not(.nim-dialog_deleted):hover .nim-dialog--text-preview, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_hovered .nim-dialog--preview>b, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_unread.nim-dialog_classic .nim-dialog--preview>b, .nim-dialog:not(.nim-dialog_deleted):hover .nim-dialog--preview>b, .nim-dialog .nim-dialog--name .nim-dialog--name-w, .ui_rmenu_item, .ui_rmenu_subitem, .im-page .nim-conversation-search-row .nim-dialog--name .nim-dialog--name-w, .im-page .im-search-results-head, .im-popular--name, .im-page--title-main-inner, .nim-dialog.nim-dialog_classic.nim-dialog_unread-out .nim-dialog--inner-text, .nim-dialog.nim-dialog_classic.nim-dialog_unread-out.nim-dialog_muted .nim-dialog--inner-text, .nim-dialog.nim-dialog_typing .nim-dialog--typing, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_hovered .nim-dialog--preview.nim-dialog--preview-attach, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_unread.nim-dialog_classic .nim-dialog--preview.nim-dialog--preview-attach, .nim-dialog:not(.nim-dialog_deleted):hover .nim-dialog--preview.nim-dialog--preview-attach, .nim-dialog .nim-dialog--preview-attach, .im-to-end, .top_notify_header, .replies_open, .wr_header, .ui_tabs_box .ui_tab_sel .ui_tab_count, .box_title_wrap.box_grey .box_title, .page_block_header, .web_cam_photo_icon, .ui_ownblock_label, .page_media_poll_title, .wl_replies_header, .mv_title, #mv_comments_header, .subheader, h4.subheader, .result_list ul li.active, .result_list ul li, .im-page-pinned--media, .tt_w, .wddi_text, .ts_contact_name, .im-fwd .im-fwd--title, .feed_new_posts, .im-chat-input--editing-head, .ui_multiselect_cnt .token .token_title, .ui_search_filters_pane .token .token_title, .page_block_sub_header, .wk_header, a b, b a, .audio_pl_edit_box .ape_audio_item_wrap .ape_attach, .audio_page_player .audio_page_player_title, ._audio_section__search .audio_row.audio_has_lyrics .audio_row__title_inner, .ap_layer__content .audio_row.audio_has_lyrics .audio_row__title_inner, .audio_page__audio_rows .audio_row.audio_has_lyrics .audio_row__title_inner, .audio_section_global_search__audios_block .audio_row.audio_has_lyrics .audio_row__title_inner, .audio_row__more_actions .audio_row__more_action, .audio_page__shuffle_all .audio_page__shuffle_all_button, .post_from_tt_row, .tickets_header, .tickets_reply_text, .top_audio_player .top_audio_player_title, .tu_row_comment, .selector_container td.selector input.focused, .selector_container td.selector input.selected, .im-page .im-page--mess-search, .ui_tab_group_items, .prefix_input_prefix, .prefix_input, .group_ad_amount, .pg_lnk_sel .pg_in, .group_ad_header, .mail_box_group_first_message, div.fc_editable~.placeholder .ph_content, .ui_search_new input.ui_search_field::placeholder, .wddi_over .wddi_sub, .ads_edit_value_header, .ads_edit_link_type_card_title, .apps_options_bar .apps_options_bar_left .app_summary_name, .app_actions_menu_wrap, .page_media_poll .page_poll_row_count, .im_stickerpack_name, .owner_photo_additional, .im-mess-stack .im-mess-stack--gift, .im-mess.im-mess_gift .im-mess--text, .pv_cont .pv_comments_header, .settings_label, #mv_pl_tt .mv_tt_playlist, .mv_recom_block_title, .idd_popup .idd_item, .idd_popup .idd_header, .reply_submit_hint_title, .reply_submit_hint_opts .radiobtn, .nim-dialog.nim-dialog_typing .nim-dialog--typer-el, .post_upload_dropbox, .mv_comments_summary, #dev_page_wrap1, .dev_page_block, .dev_page_cont .wk_header, .dev_page_cont .wk_sub_header, .dev_page_cont .wk_sub_sub_header, .dev_methods_list_desc, .group_online_answer_status_title, .group_online_status_title, .post_author_data .post_author_data_title, .photos_edit_selection_header, .dropbox_area, .feedback_header, .feedback_header b, .post_author span.author, .wall_module .copy_anon_author, .audio_claim_popup .audio_claim_popup__title, .shorten_list_stats_value, .dev_section_methods_wrap .dev_section_search_result_item, .exchange_subtab1, .exchange_table th, .tt_w.tickets_side_tt.text .tt_text, .tickets_tt_list, .tickets_tt_list_abuse, .tt_w.tickets_side_tt.title .tt_text, .help_table_question_visible>.help_table_question__q, .dev_result_num, .dev_result_bracket, .flist_item_name, .privacy_dropdown .header, .app_edit_block_header, .Tabs__item--active>*, .Button--tertiary, .Dropdown__in, .graph_menu_item.graph_menu_item_sel, .graph_menu_item.graph_menu_item_sel:hover, .gtop_complex_message .gtop_content .gtop_header, .article, .im-group-online-box .im-group-online-box--top, .Entity__title, .MultiSelect__token, .ChatSettingsMembersWidget__more, .docs_choose_dropbox, .wk_posts_stats_info_row .title, .wl_postreach_stat_subheader, .wk_reach_tooltip .wk_reach_tooltip_text, #stat_group_postsreach_table .table_header_upper_span, #stat_group_postsreach_table td {color: %pure_white%;}
#side_bar ol li .left_row, input.ui_search_field, .exchange_table_hint {color: %okay_gray%;}
a, .nim-dialog .nim-dialog--preview, .nim-dialog .nim-dialog--text-preview, .im-fwd.im-fwd_msg .im-fwd--messages, .topics_module .topic_inner_link {color: %read_text%;}
.page_counter:hover .label, #stl_text, .im-page-pinned--date {color: %slighterer_gray_hovered%;}
.post_like, .post_reply, .post_share, .wall_copy_more, .wall_post_more, .wall_reply_more, .wall_post_text a, .im-page .im-page--clear-recent, .im-page-btn, .im-page-pinned--name, .post_video_title, .ts_wrap .input_back_content, .top_notify_cont, .top_notify_cont .feedback_header, a.wall_reply_greeting, .im-mess--lbl-was-edited, .photos_choose_upload_area_drop_label, .wl_postreach_stat_smalltext {color: %linked_gray%;}
.im-mess-stack .im-mess-stack--content .im-mess-stack--pname>a, .im-right-menu .im-right-menu--count, .photos_album_intro .photos_album_intro_desc, .ui_rmenu_count.ui_rmenu_count_grey, .ui_ownblock_hint, .wide_column .topics_module .topic_title, .olist_item_name, .wall_module .media_desc .a, .tickets_author, .nim-dialog .nim-dialog--date, .tu_mem, .header_side_link, .header_side_link a, .group_edit_labeled .idd_wrap .idd_selected_value, .summary_tab3, .page_block_info, .blst_mem, .ui_tab, .ui_tabs .ui_tab, .im-dropbox--msg, .im-fwd .im-fwd--date, .im-mess-stack .im-mess-stack--content .im-mess-stack--tools, .story_feed_new_item .stories_feed_item_name, .fc_contact_name, .ap_layer .audio_pl_snippet .audio_pl_snippet__header_inner, #ads_edit_audience_title, #ads_edit_recommended_cost_title, .page_media_poll .page_poll_row_percent, .privacy_dropdown .item, .privacy_dropdown .item_sel, .privacy_dropdown .item_sel_plus, .docs_choose_attach, .idd_wrap .idd_selected_value, .im-chat-input .im-chat-input--text *, .medadd_c_linkhead, .audio-msg-track.audio-msg-player .audio-msg-track--duration, .im-mess .im-mess--btn, .photos_container_edit_grid .photos_photo_edit_row_desc_placeholder.photos_edit_has_desc, .listing, .audio_pl_snippet .audio_pl_snippet__stats, .dark_box_label, .dev_result_key, .dev_const_param_name, .app_widget_list_row, .flist_summary, .apps_edit_retina_info, .apps_edit_nav_label, .wcomments_head, .Link, .graph_menu_item, .gtop_complex_message .gtop_content .gtop_message, .im-fwd .im-fwd--messages, .im-group-online-box .im-group-online-box--list .im-group-online-box--item .im-group-online-box--item-desc, .im-group-online-box .im-group-online-box--description .im-group-online-box--description-text .im-group-online-box--description-desc, .settings_activity_history .settings_history_main_info, .box_msg, .box_msg_gray, .ChatSettingsMembersWidget__add, .Tabs__item>* {color: %linked_gray_light%;}
/* == BACKGROUND COLORS == */
body, input.text.ts_input, input.text.ts_input:focus, .im-page--chat-header, .im-page .im-page--top-date-bar, .nim-dialog.nim-dialog_failed .nim-dialog--unread, .nim-dialog.nim-dialog_unread .nim-dialog--unread, .nim-dialog.nim-dialog_unread.nim-dialog_prep-injected .nim-dialog--unread, .nim-dialog.nim-dialog_classic.nim-dialog_unread-out .nim-dialog--inner-text, .nim-dialog.nim-dialog_classic.nim-dialog_unread-out.nim-dialog_muted .nim-dialog--inner-text, .nim-dialog.nim-dialog_classic:not(.nim-dialog_deleted).nim-dialog_hovered.nim-dialog_unread-out .nim-dialog--inner-text, .nim-dialog.nim-dialog_classic:not(.nim-dialog_deleted).nim-dialog_hovered.nim-dialog_unread-out.nim-dialog_muted .nim-dialog--inner-text, .nim-dialog.nim-dialog_classic:not(.nim-dialog_deleted).nim-dialog_unread.nim-dialog_classic.nim-dialog_unread-out .nim-dialog--inner-text, .nim-dialog.nim-dialog_classic:not(.nim-dialog_deleted).nim-dialog_unread.nim-dialog_classic.nim-dialog_unread-out.nim-dialog_muted .nim-dialog--inner-text, .nim-dialog.nim-dialog_classic:not(.nim-dialog_deleted):hover.nim-dialog_unread-out .nim-dialog--inner-text, .nim-dialog.nim-dialog_classic:not(.nim-dialog_deleted):hover.nim-dialog_unread-out.nim-dialog_muted .nim-dialog--inner-text, .nim-dialog.nim-dialog_failed.nim-dialog_muted .nim-dialog--unread, .nim-dialog.nim-dialog_unread.nim-dialog_muted .nim-dialog--unread, .nim-dialog.nim-dialog_unread.nim-dialog_prep-injected.nim-dialog_muted .nim-dialog--unread, .im-page .im-page--history-new-bar:after, .im-page .im-page--history-new-bar:before, .box_title_wrap, .box_controls, .im-mess.im-mess_unread:not(.im-mess_light), .im-page-pinned, .im-mess.im-mess_light, #wk_box, .wl_post_reply_form_forbidden, .top_nav_btn.active, .top_nav_btn:hover, .top_notify_show_all, .ui_tabs.ui_tabs_box, .replies_open, .wr_header, .emoji_cat_title, .im-page.im-page_classic.im-page_group .im-group-online, .page_media_poll_wrap, .wall_comments_header, .wall_module .page_media_thumbed_link, .emoji_tab_sel, .emoji_tab_sel:hover, .emoji_tabs_l_s, .emoji_tabs_r_s, .im-page_classic.im-page .im-chat-history-resize, .im-mess.im-mess_selected+.im-mess:before, .im-mess.im-mess_unread+.im-mess:before, .im-create .im-creation--item:hover, #feed_wall, .wk_extpage_footer_wrap, .audio_row__more_actions .audio_row__more_action:hover, .top_audio_player:hover, .top_nav_link.active, .top_nav_link:hover, .summary_tab2:hover, a.group_ad_post_link, a.group_ad_post_stats, .im-dropbox--rect.dropbox_over, .online.mobile:after, .search_focused .highlight, .fc_tab_head, .fc_msgs, .fc_tab_notify, .audio_pl_snippet, .ap_layer .audio_pl_snippet .audio_pl_snippet__header_inner, #ads_edit_audience, .ads_edit_link_type_card, .page_media_poll .page_poll_row, .im_stickers_buy_header, .wall_module .wl_replies .reply, .owner_photo_additional, .msg, .chat_tab_typing_wrap, .video_choosebox_bottom, .post_upload_dropbox.dropbox_over .post_upload_dropbox_inner, .fc_msgs_unread, .scrollbar_inner, .scrollbar_inner:hover, .scrollbar_hovered, .medadd_c_linkcon, .photos_edit_selection_header, .photos_container_edit_grid .photos_photo_edit_row, .dropbox, .exchange_table th, .dev_const_params, #group_apps_list .group_apps_list_rows .group_apps_list_row .group_apps_edit, .flist_sel, .wcomments_head, .video_choose_upload_area, .group_api_url_desc, .PopupHeader, .ChatSettings__content, .SubmitArea, .dropbox_over .photos_choose_upload_area_drop, .photos_choose_upload_area_enter .photos_choose_upload_area_drop, .piechart_col_header th, .wke_controls, .wk_poll_tabs, .wk_poll_dmgr, .gifts_box_header, .docs_choose_dropbox_wrap, .paginated_table_header, .paginated_table_header th.paginated_table_cell, .round_tab.selected, .round_tab.selected:hover {background-color: %very_gray%;}
input, #page_header_cont .back, .page_block, .profile_info_header, .profile_info_edit, .fakeinput, div[contenteditable=true], input.big_text, input.dark, input.search, input.text, textarea, .submit_post, #side_bar ol li .left_row:hover, .wall_module .reply_fakebox, .wall_module .reply_box, .wall_module .reply_fakebox_wrap, .wall_module .reply_form, .ui_actions_menu, .page_actions_wrap, .page_actions_header, .ms_items_more, .pv_cont .narrow_column, .pv_author_block, .tt_default, .tt_default_right, .im-page_classic.im-page .im-page--dcontent, .im-page .im-page--dialogs-footer.ui_grey_block, .ui_search, .im-page_classic.im-page .im-page--dialogs-search, .im-page_classic.im-page .im-page--chat-body-wrap-inner, .im-page--toolsw, .im-page_classic.im-page .im-page--chat-body-abs, .im-page_classic .im-page--chat-header-in, .im-page .im-page--history-new-bar, .im-chat-input.im-chat-input_classic, .im-chat-input, .im-page .im-page--header, .im-page .im-page--search-header, .im-mess.im-mess_selected:last-child:before, .im-mess.im-mess_unread:last-child:before, .box_body, .im-to-end .im-to-end--label, .chat_onl_inner, #top_notify_wrap, .top_notify_cont .feedback_row:not(.dld).hover, .top_notify_cont .feedback_row:not(.dld):hover, .top_notify_show_all:hover, .pv_white_bg, .photos_container .photos_row, .emoji_tt_wrap, .ui_tabs_header, .page_block_header, .photos_choose_upload_area, .web_cam_photo, .docs_choose_upload_area, .im-page.im-page_classic.im-page_group .im-group-online .im-group-online--inner, .stl_active.over_fast #stl_bg, .mv_info, .selector_container, .result_list ul, div.wdd, .emoji_tabs, .wddi, .ui_scroll_default_theme>.ui_scroll_bar_container>.ui_scroll_bar_outer>.ui_scroll_bar_inner, .ts_cont_wrap, .im-page .im-page--history-new-bar>span, .im-create .im-create--tabs, .im-create .im-creation--item.im-creation--item_hovered, .im-create .im-creation--item, .im-create, .im-create.im-create_classic .im-create--table, .im-create.im-create_classic .im-create--footer, .wk_text blockquote, .docs_panel, .audio_layer_container .audio_page_player, .audio_page_player .audio_page_player__cover, .eltt, .ui_search_sugg_list, .audio_page_layout .audio_friends_list, .wk_table th, .tickets_post_field, .faq_tabs.ui_tabs, #top_profile_menu, .mention_tt_actions, .im-page .im-page--mess-search, .ui_tab_group_items, .page_block_info, .group_l_row, .mail_box_cont, .im-dropbox, .wall_module .reply, .replies_side, .fc_tab, div.fc_tab_txt, #fc_contacts, .fc_content, div.fc_clist_filter_wrap, .round_button, .ads_edit_page_wrap3, .apps_options_bar, .apps_cont_msg, .apps_footer, .wl_replies_header.wl_replies_header_clickable:hover, .group_tokens_row, .gedit_block_footer, .ui_table tr.ui_table_row, .privacy_dropdown .header, .settings_block_footer, #mv_pl_tt .mv_tt_add_playlist, .idd_popup .idd_items_content, .idd_popup .idd_header_wrap, .post_upload_dropbox, #dev_page_wrap1, .dev_page_block, #dev_top_nav_wrap, .shorten_list_row, #dev_left_nav, .dev_section_methods_wrap, .dev_section_methods_wrap .dev_section_search_result_wrap, #ads_page, #ads_page_bottom_info, .exchange_not_found.table, .dark_box_cont, .help_table_question_sa.help_table_question_visible, .dev_req_result, .apps_edit_retina_info, .apps_edit_nav_header, .photos_period_delimiter_fixed, .wcomments_form, .wcomments_mini #page_wrap, .ChatSettingsInfo, .List, .List--border, .ChatSettingsMembersWidget, .Button--mobile, .ChatSettingsInvitationLink, .PopupHeader__backBtn:hover, .Dropdown__in, .article, .wke_b:hover, .box_msg, .box_msg_gray, .MultiSelect__search, .ChatSettingsMembers, #wl_postreach_stat_body, #stat_group_postsreach_table td, .page_status_editor .editor {box-shadow: none; background-color: %slightly_gray%;}
.button_gray button.hover, .button_gray button:hover, .flat_button.secondary.hover, .flat_button.secondary:hover, .button_blue button.hover, .button_blue button:hover, .flat_button.hover, .flat_button:hover, .pv_cont .pv_comments_header:hover, .exchange_subtab1:hover {background-color: %slighterer_gray_hovered%;}
.my_current_info:hover, .profile_more_info_link:hover, #profile_groups_link:hover, .left_count_wrap, .button_gray button, .flat_button.secondary, .wall_module .post_like:hover, .wall_module .post_reply:hover, .wall_module .post_share:hover, .button_blue button, .button_gray button, .button_light_gray button, .flat_button, .ui_actions_menu_item:hover, .page_actions_item:hover, .media_selector .ms_items_more .ms_item:hover, .pv_like:hover, .pv_cont .pv_can_edit:hover, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_hovered, .nim-dialog:not(.nim-dialog_deleted):hover, .ui_rmenu_item:hover, .ui_rmenu_subitem:hover, .ui_rmenu_item_sel, .ui_rmenu_item_sel:hover, .im-mess.im-mess_selected:not(.im-mess_is_editing), .im-mess.im-mess_selected:not(.im-mess_is_editing):hover, .chat_tab_wrap:hover, .im-mess.im-mess_search:hover, .audio_row:hover:not(.audio_row__current) .audio_row_content, .emoji_bg, .photos_choose_upload_area:hover, .web_cam_photo:hover, .docs_choose_upload_area:hover, .docs_choose_rows .docs_item:hover, .ui_ownblock:hover, #mv_comments_header, .result_list ul li.active, .feedback_row_wrap.unread:not(.feedback_row_touched), .im_msg_audiomsg .audio-msg-track:not(.audio-msg-player):hover, .summary_tab_sel .summary_tab2, .summary_tab_sel .summary_tab2:hover, .wddi_over, a.ts_contact.active, .im-mess.im-mess_selected+.im-mess:before, .emoji_tab:hover, .emoji_shop:hover, .ui_multiselect_cnt .token, .ui_search_filters_pane .token, .audio_pl_edit_box .ape_add_audios_btn:hover, .audio_pl_edit_box .ape_add_pl_audios_btn:hover, .ui_search_sugg_list .ui_search_suggestion_selected, .audio_page__shuffle_all .audio_page__shuffle_all_button:hover, .audio_layer_container .audio_friend:hover, .post_from_tt_row.active, .post_from_tt_row:hover, .tickets_header, .audio_row.audio_row__current .audio_row_content, .tu_last:hover, .top_profile_mrow:hover, .im-page .im-page--mess-search:hover, .ui_tabs .ui_tab_group_item:hover, .prefix_input_wrap, .group_ad_info_link:hover, .group_ad_header, .blst_last:hover, .replies_side:hover, .fc_msgs_out .fc_msgs, a.fc_contact_over, .round_button:hover, .olist_item_wrap:hover, .tabbed_box .summary_tab .summary_tab3:hover, .tabbed_box .summary_tab_sel .summary_tab3:hover, .tabbed_box .summary_tab_sel a:hover, .tabbed_box .summary_tab a:hover, .page_media_poll .page_poll_percent, .im-mess.im-mess_gift, .pv_cont .pv_comments_header, .privacy_dropdown .item_sel, .privacy_dropdown .item_sel_plus, #mv_pl_tt .mv_tt_add_playlist:hover, .idd_popup .idd_item.idd_hl, .idd_popup .idd_item:active, .idd_popup .idd_item.idd_hover, .idd_popup .idd_item.idd_hover_sublist_parent, .dev_methods_list_row:hover, .im-popular--unread, .dev_top_link.sel, .dev_top_link.sel:hover, .pr_bt, .dev_nav a.nav.nav_selected, .dev_nav a.nav.nav_selected:hover, .dev_nav .nav:hover, .dev_section_methods_wrap .dev_section_search_result_item.over, .group_activity_row_wrap .group_obscene_word, .exchange_subtab1.active, .ads_main_notice, .help_table_question_visible, .flist_item_wrap:hover, .app_edit_block_header, .preq_wrap, .ok_msg, .EditableLabel:hover .EditableLabel__text, .ListItem--selectable:hover, .Button--mobile:hover, .Dropdown__item:hover, .graph_menu_item.graph_menu_item_sel, .graph_menu_item.graph_menu_item_sel:hover, .medadd_inline_editable:hover, .MultiSelect__token {background-color: %slightly_gray_hovered%;}
#side_bar .left_icon, #side_bar ol li .left_row:hover, .media_selector .ms_item:before, .media_selector .ms_item:hover, input.text.ts_input, .wall_module .post_like_icon, .wall_module .post_reply_icon, .wall_module .post_share_icon, .wall_module .post_views_icon, .ui_tab_plain, .like_btn, .wall_module .reply_action, .wall_module .reply .reply_action:hover, .checkbox:before, .pv_like_icon, .page_doc_row .page_doc_icon, .topics_module .topic_icon, a.groups_messages_block:before, .ui_actions_menu_item.im-action:hover:before, .ui_actions_menu_item.im-action:before, .im-right-menu .im-right-menu--close:before, .audio_row .audio_row__action_next, .audio_pl_edit_box .ape_add_audios_btn:before, .audio_pl_edit_box .ape_add_pl_audios_btn:before, .audio_pl_edit_box .ape_add_audios_btn:after, .audio_pl_edit_box .ape_add_pl_audios_btn:after, .ui_calendar_icon, .ui_calendar_icon:hover, .im-mess .im-mess--check, .im-page--chat-header_actions .im-page--mess-actions, .im-page .im-page--dialogs-settings, .im-page--back-btn, .im-to-end, .chat_onl_cont, .top_nav_btn#top_notify_btn .top_nav_btn_icon, .top_nav_btn#top_audio:hover .top_nav_btn_icon, .top_nav_btn#top_audio .top_nav_btn_icon, .web_cam_photo_icon, .photos_choose_upload_area_label, .docs_choose_upload_area_label, .left_settings_inner, .ui_toggler, .box_x_button.box_x_tabs, .wall_module .my_like .post_like_icon, .wall_module .my_share .post_share_icon, .sort_not_rev_icon, .sort_rev_icon, #stl_text, .audio_row .audio_row__play_btn, .im-dialog-select .im-dialog-select--btn, .im-page--header-icon_answer:before, .im-page--header-icon_star:before, .im-page_classic.im-page .im-page--gim-mute, .audio-msg-track .audio-msg-track--wave-wrapper .audio-msg-track--wave, .audio-msg-track .audio-msg-track--btn, .feed_filter_icon, .feed_lists_icon .ui_actions_menu_icons, .page_actions_cont.narrow .page_actions_header, .page_actions_cont.narrow .page_extra_actions_btn, .wdd_add, .im-chat-input .im-chat-input--send, .emoji_smile_icon_vector, .im-chat-input .im-chat-input--attach-label, .ms_items_more_wrap.ms_items_more_wrap_vector .ms_item_more_label, .im-page_classic .im-page--chat-header_muted .im-page--title-main-in:after, .im-page--header-icon.im-page--header-icon_search:before, .im-page--header-more .ui_actions_menu_icons, .nim-dialog .nim-dialog--markre, .nim-dialog .nim-dialog--star, .ts_contact_status, .im-mess .im-mess--fav, .im-mess .im-mess--reply, .im-mess .im-mess--edit, .olist_checkbox, .ui_multiselect_cnt .token .token_del, .ui_search_filters_pane .token .token_del, .wall_module .media_desc b, .wall_module .media_preview .note b, .wall_module .media_preview .poll b, .wall_module .media_preview .share b, .page_upload_label, .box_body .ui_box_search, .radiobtn, .pv_cont .pv_closed_commments_placeholder, .emoji_smile_icon, .audio_page_player .audio_page_player__cover, .audio_page_player .audio_page_player_ctrl, .ui_search_new .ui_search_button_search, .audio_w_covers .audio_row .audio_row__cover, .audio_page__shuffle_all .audio_page__shuffle_all_button:before, .nim-dialog .nim-dialog--close, .nim-dialog.nim-dialog_muted .nim-dialog--mute, .nim-dialog.nim-dialog_unread.nim-dialog_prep-injected.nim-dialog_muted .nim-dialog--mute, .audio_row.audio_row__current .audio_row_content, .selector_container td.selector .token, .pedit_add_row, .im-page .im-i--messages-search, .apps_cat_header_link:after, .app_rate, a.group_ad_post_link, a.group_ad_post_stats, .group_l_row .group_l_delete, .group_l_row .group_l_edit, .group_l_row .group_l_progress, .blst_closed, .blst_fixed, .bp_action, .im-dropbox--icon-doc, .im-dropbox--icon-photo, .im-fwd .im-fwd--close, .audio_row .audio_row__action_more, .audio_row .audio_row__action_add, .audio_row .audio_row__action_restore_listened, .audio_row .audio_row__action_restore_recoms, .replies_side, .fc_tab_attach .media_selector .ms_item_more, .chats_sp, .audio_pl_snippet .audio_pl_snippet__action_btn, .audio_pl_snippet .audio_pl_snippet__more_btn:before, .audio_pl_snippet_play_small, .ads_edit_link_type_card_image_group, .ads_edit_link_type_card_radio, .ui_actions_menu_icons, .im-mess--cancel-edit, .box_title_wrap.box_grey .box_x_button, .ui_search_custom input.ui_search_field, .page_media_poll .page_poll_row.page_poll_voted:before, .im-page-pinned--hide, .im-page-pinned:before, .wall_signed_by, .page_cover_image .ui_actions_menu_item:before, .owner_photo_cover_image, .ui_search_input_block, .privacy_locked, .docs_action_icon, .mv_share_button .mv_share_icon, .mv_add_button .mv_add_icon, #mv_pl_tt .mv_tt_playlist_private_icon, #mv_pl_tt .mv_tt_add_playlist .mv_tt_plus_icon, .idd_wrap .idd_arrow, .group_info_row:before, .wk_subscribe_icon, .ui_progress .ui_progress_bar, .media_preview .progress_x, .im-page .im-page--history.im-page--history_loading:before, .profile_gift_send_btn .send_thumb, .fc_msg_att_icon_doc, .fc_msg_att_icon_mail, .fc_msg_att_icon_wall, .wall_module .reply_to_title .reply_to_cancel, .checkbox_official:after, .page_docs_preview .page_media_x_wrap .page_media_x, .im-page--selected-messages-remove, .idd_popup .idd_item.idd_sublist, .friends_possible_link, .group_online_answer_pict, .dropbox, .upload_progress, .ui_rmenu_item_arrow, .gift_delete, .top_audio_play__button, .audio_claim_popup, .checkbox_container table td .checkbox_off, .checkbox_container table td .checkbox_off_over, .checkbox_container table td .checkbox_on, .checkbox_container table td .checkbox_on_over, .tickets_tt_list, .tickets_tt_list_abuse, .flist_item_checked .flist_item_action, .flist_list_nomargin .flist_item_wrap.flist_item_checked:hover .flist_item_action, .privacy_dropdown .header, .ChatSettingsMembersEdit__actions, .Button--primary, .photos_choose_upload_area_drop_label, .wke_b, .info_msg, .ChatSettingsMembersWidget__add:before, .ChatSettingsMembersWidget__searchIcon:before, .MultiSelect__tokenRemove, .ChatSettingsMembers__entity--selected:after, .like_views, .docs_choose_dropbox {filter: %grayscale%}
.nim-dialog:not(.nim-dialog_deleted).nim-dialog_unread.nim-dialog_classic {background-color: %unread_message%;}
.ui_rmenu_sliding .ui_rmenu_slider, .feed_new_posts>b, .nim-dialog.nim-dialog_starred:before, .ListItem--border:before {background-color: %okay_gray%;}
.im-page--back-btn:hover, .im-chat-input .im-chat-input--txt-wrap, .emoji_cats_title_helper:after, .im-group-online-box .im-group-online-box--top {background: none;}
.im-member-item .im-member-item--photo img {background-color: none;}
.privacy_dropdown .body {background-color: %slightly_gray_1%;}
.im-page_classic.im-page .im-page--history_loading, .idd_popup {box-shadow: none;}
.emoji_tabs_l_sc, .emoji_tabs_r_sc, .ui_scroll_default_theme.ui_scroll_emoji_theme>.ui_scroll_overflow>.ui_scroll_shadow_bottom, .ui_scroll_default_theme.ui_scroll_emoji_theme>.ui_scroll_overflow>.ui_scroll_shadow_top {display: none;}
.im_stickers_close:after {filter: invert()!important}
/* == BORDER COLORS == */
#page_header_cont .back {border-bottom: none;}
.submit_post, .module, #ads_left.ads_left_empty+.left_menu_nav_wrap, #side_bar .more_div, .wall_module .copy_quote, .post_full_like_wrap, .wall_module .replies_list, .wall_module .reply~.reply .dld, .wall_module .reply~.reply .reply_wrap, .wall_module .reply_box, .wall_module .reply_fakebox_wrap, .ui_tab_sel, .ui_tab_sel:hover, .ui_tabs .ui_tab_sel, .ui_tabs .ui_tab_sel:hover, .ui_tabs_box .ui_tab_sel, .ui_tabs_box .ui_tab_sel:hover, .page_actions_inner, .pv_author_block, .post_publish, .nim-dialog:not(.nim-dialog_deleted).nim-dialog.nim-dialog_classic.nim-dialog_unread, .nim-dialog:not(.nim-dialog_deleted).nim-dialog.nim-dialog_hovered, .nim-dialog:not(.nim-dialog_deleted).nim-dialog:hover, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_hovered+.im-search-results-head, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_hovered+.nim-dialog, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_selected+.im-search-results-head, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_selected+.nim-dialog, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_unread.nim-dialog_classic+.im-search-results-head, .nim-dialog:not(.nim-dialog_deleted).nim-dialog_unread.nim-dialog_classic+.nim-dialog, .nim-dialog:not(.nim-dialog_deleted):hover+.im-search-results-head, .nim-dialog:not(.nim-dialog_deleted):hover+.nim-dialog, .nim-dialog .nim-dialog--content, .im-page .im-page--dialogs-footer, .ui_rmenu_item_sel, .ui_rmenu_item_sel:hover, .im-page--toolsw, .ui_actions_menu_sep, .im-chat-input, .im-page .im-page--top-date-bar, .im-chat-input .im-chat-input--txt-wrap, .pv_comments, .ui_search_filters_pane, .im-page .im-page--history-new-bar:after, .im-page .im-page--history-new-bar:before, .im_fwd_log_wrap, .im_wall_log_wrap, .im-member-item, .box_controls, .im-page-pinned, .im-to-end .im-to-end--label, .wl_post_reply_form_forbidden, .feed_row~.feed_row .feedback_row, .feed_row~.feed_row .feedback_sticky_row, .feed_row~.feed_row_fb_hidden .feed_row:first-child .feedback_row, .feedback_sticky_rows:not(:empty)+.feed_row .feedback_row, .feedback_sticky_rows:not(:empty)+.feed_row .feedback_sticky_row, .top_notify_header, .top_notify_show_all, .ui_tabs.ui_tabs_box, .box_title_wrap.box_grey, .flat_button.ui_load_more_btn, .friends_user_row, .docs_choose_rows .docs_item, .wall_comments_header, .wl_replies_header, .wall_module.wl_post .reply .reply_wrap, .top_nav_btn:hover .top_notify_count, .top_notify_count, .im-mess .im-mess--post, .profile_msg_split .profile_btn_cut_left, .profile_msg_split .profile_btn_cut_right, .wddi, .wddi_over, div.wdd, .fakeinput, .fakeinput~.placeholder .ph_input, input.big_text, input.big_text~.placeholder .ph_input, input.dark, input.dark~.placeholder .ph_input, input.search, input.search~.placeholder .ph_input, input.text, input.text~.placeholder .ph_input, textarea, textarea~.placeholder .ph_input, .im-fwd, .ui_tabs, .im-create .im-creation--item.im-creation--item_hovered, .im-create .im-creation--item:hover, .olist_item_wrap, .ui_search, .ui_grey_block, .search_results_sep, .wk_extpage_footer_wrap, .wk_text blockquote, .page_actions_separator, .audio_pl_edit_box .ape_add_audios_btn, .audio_pl_edit_box .ape_add_pl_audios_btn, .audio_layer_container .audio_page_player, .eltt, .ui_search_new .ui_search_button_search, .ui_search_new .ui_search_input_inner, .ui_search_sugg_list, .audio_page_layout .has_friends_block .audio_page__rows_wrap, .wk_table, .wk_table th, .wk_table td, .tickets_header, .tickets_post_form__panel, .tickets_post_field, .page_block_header, .tu_row, .tickets_reply_row, .help_table_question, .top_profile_sep, .selector_container table.selector_table, .result_list, .mention_tt_actions, .im-page .im-page--mess-search, .ui_tab_group_items, .ui_tab_group_separator, .page_block_info, .pages_bottom .pg_lnk_sel .pg_in, .group_ad_header, .group_l_row, #mail_box_editable, .ui_rmenu_sep, .group_box_row, .blst_row, .bp_post, .pg_lnk_sel .pg_in, .bt_header, .im-dropbox--rect, .story_feed_new_item .stories_feed_item_ava, .audio_pl_snippet, .audio_pl_snippet .audio_pl_snippet__header, a.ads_edit_link_go, .ads_edit_separator_big, .tabbed_box .summary_tab_sel, #apps_user_warning_cont, .apps_options_bar, .apps_footer, .im_stickers_buy_header, a.group_app_button_multi, .wall_module .media_desc .lnk.lnk_mail, .owner_photo_additional, .gedit_block_footer, .groups_api_divider, .group_api_requests_table.ui_table tr.ui_table_row, .msg, .wide_column .page_top, .counts_module, .profile_info_block, .settings_privacy_row, .settings_block_footer, .settings_bl_row, .docs_item, #mv_pl_tt .mv_tt_add_playlist, .group_list_row, .video_choosebox_bottom, .post_upload_dropbox_inner, .mv_comments_summary, .media_selector .ms_item.ms_item_article, .photos_edit_selection_header, .photos_container_edit_grid .photos_photo_edit_row_desc_placeholder, .dropbox_area, .upload_progress_wrap, .shorten_list_row, .dev_nav a.nav.nav_selected, .dev_nav a.nav.nav_selected:hover, .dev_section_methods_wrap .dev_section_search_wrap, .dev_method_block .dev_method_block_title, #ads_page_bottom_info, .exchange_title_head, .exchange_table tr, .exchange_table tr:first-child, .ads_main_notice, .help_table_questions, .dev_method_req_table, .dev_const_params, #group_apps_list .group_apps_list_rows .group_apps_list_row .group_apps_edit, .flist_sel, .flist_item_wrap, .app_edit_block_header, .apps_edit_screen_line, .apps_edit_nav_header, .apps_edit_embedded_control_container, div[contenteditable=true], .wcomments_post .reply_box_inner_wrap .reply_fakebox, .wcomments_post .reply_box_inner_wrap .reply_field, .wcomments_post .reply_box_inner_wrap .reply_field~.placeholder .ph_input, .preq_tt, .wide_column .topics_module .topic_row, .ListItem--selectable:hover, .Tabs, .SubmitArea, .dropbox_over .photos_choose_upload_area_drop, .photos_choose_upload_area_enter .photos_choose_upload_area_drop, .piechart_table tr td, .im-group-online-box .im-group-online-box--top, .im-group-online-box .im-group-online-box--description, .wke_controls, .box_msg, .box_msg_gray, .media_preview_has_medias, .ChatSettingsMembersWidget__add:before, .MultiSelect__search, .ChatSettingsMembers__entity--selected:after, .wk_poll_tabs, .wk_poll_dmgr, .docs_choose_dropbox_wrap, #wl_postreach_stat_body, .paginated_table_header, #stat_group_postsreach_table td, .stats_time_info, .page_status_editor .editor {border-color: %okay_gray%;}
.ui_actions_menu, .page_actions_wrap, .page_actions_header, .ms_items_more, .tt_default, .tt_default_right, .im-page_classic .im-page--chat-header, .im-page_classic.im-page .im-page--chat-input, .im-page_classic.im-page .im-page--chat-body-wrap-inner, .im-page_classic.im-page .im-page--header, .emoji_tt_wrap, .selector_focused table.selector_table, .wdd_list, .online:after, #top_profile_menu, .replies_side, div.fc_tab_txt, div.fc_clist_filter_wrap, .privacy_dropdown .header, .privacy_dropdown, .idd_popup, .wcomments_form, .Dropdown__in {border-color: %very_gray%;}
#top_notify_wrap, .photos_container .photos_row, .fc_tab_head, .fc_tab, .fc_tab_notify, #fc_ctabs_cont {border-color: %slightly_gray%;}
.group_friends_image, .Tabs__item--active, .Tabs__item--active:hover {border-color: %slightly_gray_hovered%;}
.fc_msgs, .fc_msgs_out .fc_msgs, .group_tokens_row:last-child, .like_cont {border: none!important;}
.ads_edit_link_type_card.selected {border-color: %pure_white%;}
/* == UI TRICKS == */
.image_cover, .photos_choose_row, #top_notify_wrap, .photos_container .photos_row {border-radius: 5px;}
.im_sticker_row {-webkit-filter: drop-shadow(3px 3px 0 #777777) drop-shadow(-3px -3px 0 #777777); filter: drop-shadow(3px 3px 0 #777777) drop-shadow(-3px -3px 0 #777777);}

/* == SCREW DEFAULT API IMAGE == */
.wall_post_source_icon {background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABU1BMVEUAAAD///8REREZGRkAAAAEBAQEBAQAAAAZGRkREREjIyMAAAALCwsPDg0OBQMPDg0LCwsAAAAjIyMUFBRTUVHQsKrQsKpTUVEUFBQFBQXj4eHt8PD/5N3/VjP/5N7t8PDj4eEFBQUAAACenp5hcnZhcnaenp4AAAAAAABdX2AHl7gHl7hdX2AAAAAAAABDQkIraXgyPkEyPkEraXhDQkIAAAAVFRXHvbuopqWfoKCopqXHvbsVFRUAAAC8vr9wcHFwcXG9v78AAAAAAAAEBATZ2dnf39/Z2dkEBAQAAAAAAAAAAAABAQEqKioqKioBAQEAAAAAAABGRkZGRkZCQkKyurzEIgKyurxCQkJxcXFxcXGIiIh6fH11Y2B6fH2IiIh1dHQHJSwAAAAHJi11dHR4eHgsJiR4eHiQkJCQkJBDQ0NKSUlCQkJubm5ubm5DQ0P///8TfFsbAAAAUnRSTlMAAMb6LwICL/rG75yLoJygi5zvtPv///u0svr7+/v7+/qytP3///20m/z///ybH+z+///+7CDN/f////3NfPn+/vl8B779//2+BwELi+vriwsBriooAgAAAAFiS0dEAf8CLd4AAAAHdElNRQfhDBYUKBWK4cYoAAAAhUlEQVQI1wXBQwICAAAEwM22bdu2bduu/9+aAZFEBgVU0OgMMIcsNofL4wtGQojG4olkKp3J5nIoFkqVWqPV6ZcGGFcm83qztVh3Ntj3DufheHK5zx54fRd/4BoM3cIREKL3WDyRTD3SBCDzzOZe+cK7CKBU/lSqtW+9ATTRand+3V4fgz8s+hhKWwGqOQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMi0yMlQyMDo0MDoyMS0wNTowMAmNQVUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTItMjJUMjA6NDA6MjEtMDU6MDB40PnpAAAAAElFTkSuQmCC');}
`;
for (var key in colors) css.innerText = css.innerText.replaceAll('%'+key+'%', colors[key]+'!important');

if (localStorage.getItem('VKDarkMode') === null) localStorage.setItem('VKDarkMode', false);
var darkmodeEnabled = localStorage.getItem('VKDarkMode') == 'true';

var ptp = document.querySelector('#top_nav > div.head_nav_item.fl_l.head_nav_btns');
var div = document.createElement('div');
div.innerHTML = `<a id="top_nightmode" class="top_nav_btn" href="#" onmousedown="toggleNightMode()" onclick="return checkEvent(event);" aria-label="Ночной режим" aria-haspopup="false" accesskey="4">
    <span class="blind_label">Ночной режим</span>
    <div class="top_nav_btn_icon"><svg viewBox="0 0 24 24" style="fill: rgb(56, 56, 56);pointer-events: none;display: block;width: 100%;height: 100%;"><g>
        <path d="M12.7 2C7.33 2.15 3 6.57 3 12c0 5.52 4.48 10 10 10 3.52 0 6.6-1.82 8.4-4.56h-.3c-5.52 0-10-4.48-10-10 0-2 .6-3.87 1.6-5.44z"></path>
      </g></svg></div>
</a>
<a id="top_vknsettings" class="top_nav_btn" href="#" onmousedown="showVKNSettings()" onclick="return checkEvent(event);" aria-label="VKN Настройки" aria-haspopup="false" accesskey="5">
    <span class="blind_label">VKN Настройки</span>
    <div class="top_nav_btn_icon"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="fill: rgb(56, 56, 56);pointer-events: none; display: block; width: 100%; height: 100%;"><g>
        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.1-1.65c.2-.15.25-.42.13-.64l-2-3.46c-.12-.22-.4-.3-.6-.22l-2.5 1c-.52-.4-1.08-.73-1.7-.98l-.37-2.65c-.06-.24-.27-.42-.5-.42h-4c-.27 0-.48.18-.5.42l-.4 2.65c-.6.25-1.17.6-1.7.98l-2.48-1c-.23-.1-.5 0-.6.22l-2 3.46c-.14.22-.08.5.1.64l2.12 1.65c-.04.32-.07.65-.07.98s.02.66.06.98l-2.1 1.65c-.2.15-.25.42-.13.64l2 3.46c.12.22.4.3.6.22l2.5-1c.52.4 1.08.73 1.7.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.6-.25 1.17-.6 1.7-.98l2.48 1c.23.1.5 0 .6-.22l2-3.46c.13-.22.08-.5-.1-.64l-2.12-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path>
      </g></svg></div>
</a>`;
setTimeout(function(){
    var v = document.querySelector('#top_nav > div.head_nav_item.fl_l.head_nav_btns');
    if (v) {
        v.appendChild(div.firstChild);
        div.firstChild.remove();
        v.appendChild(div.firstChild);
    }
}, 2500);

var appended = false;

if (darkmodeEnabled == true) {
    document.head.appendChild(css);
    appended = true;
    interval = setInterval(function(){
        if (document.head.lastChild.id != socalled) swapElements(css, document.head.lastChild);
    }, 250);
}
function swapElements(obj1, obj2) {
    if (obj1.id == obj2.id) return;
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);
    obj2.parentNode.insertBefore(obj1, obj2);
    temp.parentNode.insertBefore(obj2, temp);
    temp.parentNode.removeChild(temp);
}

unsafeWindow.toggleNightMode = function(){
    darkmodeEnabled = !darkmodeEnabled;
    localStorage.setItem('VKDarkMode', darkmodeEnabled);
    if (darkmodeEnabled) {
        if (!appended) document.head.appendChild(css);
        interval = setInterval(function(){
            if (document.head.lastChild.id != socalled) swapElements(css, document.head.lastChild);
        }, 250);
    } else {
        if (interval >= 0) clearInterval(interval);
        appended = false;
        document.head.removeChild(css);
    }
};

unsafeWindow.showVKNSettings = function(){
    if (document.getElementById('vknsettings')) return;
    var box = document.createElement('div');
    box.id = 'vknsettings';
    box.className = 'popup_box_container';
    box.setAttribute('tabindex', '0');
    box.setAttribute('style', 'width: 560px; margin-top: 186.333px;');
    box.innerHTML = `<div class="box_layout" onclick="__bq.skip=true;">
    <div class="box_title_wrap" style="">
        <div class="box_x_button" aria-label="Закрыть" tabindex="0" role="button" onclick="closeVKNSettings();"></div>
        <div class="box_title_controls"></div>
        <div class="box_title">Настройки VKN</div>
    </div>
    <div class="box_body" style="display: block; padding: 0px;">
        <div style="padding: 10px 25px;">
            <h4 class="subheader">Управление отправкой данных</h4>
            <div style="padding: 5px;">
                <div class="checkbox{a1}" onclick="checkbox(this); VKNOptionSet('noonline', isChecked(this));" role="checkbox" aria-checked="{v1}" tabindex="0">
                    Не отправлять данные об онлайне
                </div>
            </div>
            <div style="padding: 5px;">
                <div class="checkbox{a2}" onclick="checkbox(this); VKNOptionSet('silentwrite', isChecked(this));" role="checkbox" aria-checked="{v2}" tabindex="0">
                    Не показывать, что вы пишите сообщение
                </div>
            </div>
            <div style="padding: 5px;">
                <div class="checkbox{a3}" onclick="checkbox(this); VKNOptionSet('silentread', isChecked(this));" role="checkbox" aria-checked="{v3}" tabindex="0">
                    Не помечать сообщения прочитанными
                </div>
            </div>
            <div style="padding: 5px;">
                <div class="checkbox{a4}" onclick="checkbox(this); VKNOptionSet('silentwatch', isChecked(this));" role="checkbox" aria-checked="{v4}" tabindex="0">
                    Не показывать, что вы просмотрели видео
                </div>
            </div>
        </div>
    </div>
    <div id="im_chatbox_sh"></div>
    <div class="box_controls_wrap" style="display: block;">
        <div class="box_controls">
            <table cellspacing="0" cellpadding="0" class="fl_r">
                <tbody>
                    <tr>
                        <td><button class="flat_button" onclick="closeVKNSettings();">Закрыть</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>`
        .replace('{a1}', VKNOptionGet('noonline') ? ' on' : '').replace('{a2}', VKNOptionGet('silentwrite') ? ' on' : '').replace('{a3}', VKNOptionGet('silentread') ? ' on' : '').replace('{a4}', VKNOptionGet('silentwatch') ? ' on' : '')
        .replace('{v1}', VKNOptionGet('noonline').toString()).replace('{v2}', VKNOptionGet('silentwrite').toString()).replace('{v3}', VKNOptionGet('silentread').toString()).replace('{v4}', VKNOptionGet('silentwatch').toString());
    var layer = document.getElementById('box_layer');
    while (layer.children.length > 1) layer.children[1].remove();
    layer.appendChild(box);
    layer.parentNode.style.display = 'block';
};

unsafeWindow.closeVKNSettings = function(){
    document.getElementById('box_layer').parentNode.style.display = '';
    document.getElementById('vknsettings').remove();
};

unsafeWindow.VKNOptionSet = function(name, value){
    vknopts[name] = value;
    GM_setValue("VKNOptions", vknopts);
};

function VKNOptionGet(name){
    return vknopts[name];
}

XMLHttpRequest.prototype.realXMLRequestSend = XMLHttpRequest.prototype.send;
var fakeXMLRequest = function(vData) {
    if (vData && typeof(vData) == 'string'){
        if (
            (vData.includes('a_mark_read') && VKNOptionGet('silentread')) || // Read
            (vData.includes('a_typing') && VKNOptionGet('silentwrite')) || // Write
            (vData.includes('a_online') && VKNOptionGet('noonline')) || // Online
            ((vData.includes('event=load') || vData.includes('videocat') || vData.includes('seek_durations')) && VKNOptionGet('silentwatch')) // Video
        ){
            this.onreadystatechange = function(){};
            this.abort();
            return;
        }
    }
    this.realXMLRequestSend(vData);
};

XMLHttpRequest.prototype.send = fakeXMLRequest;
