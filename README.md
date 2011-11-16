# jQuery Delayed Change Plugin

Capture any changes for an input after a small delay.

Instead of using `.keydown` or `.keypress` which will trigger each time a key is pressed, capture changes after the user has made more changes. Useful for fields where a user may be doing a "live" search.

Site:
[jquery-delayedchange on github](http://github.com/pnmg/jquery-delayedchange)

Web Site:
[pnmg.com](http://pnmg.com)

## Example

    // delayed AJAX search
    $(document).ready(function(){
  
      $('#myInput').delayedChange(function(){
        $.getJSON('/search', {query: $(this).val()}, function(data){
          // update search results...
          $('#results').html(data.resultsHTML);
        });
      });
    });

License
=============================

Copyright (C) 2011  Paradigm New Media Group

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.