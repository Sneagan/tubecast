import urllib2
import re
import sys,os,glob,subprocess
import urlparse
import xml.etree.ElementTree as ET
import shutil

video_data='%7C(.*?videoplayback.*?)%2C'
def download(url, keep, dir_name):
  if keep == 'Y':
    if not os.path.exists('videos'):
      os.makedirs('videos')

  if not os.path.exists('audio'):
    os.makedirs('audio')

  download_video = 'youtube-dl ' + url
  os.system(download_video)

  filename = glob.glob('*.mp4')[0]
  newname = filename.replace(' ', '_').replace('[','').replace(']','').replace('-','_').replace('&','_and_').replace('.mp4','')

  os.rename(filename, newname)

  strip_audio='ffmpeg -i ' + newname + ' -ab 160k -ac 2 -ar 44100 -vn ' + newname + '.mp3'

  os.system(strip_audio)

  if keep == 'Y':
    shutil.move(newname, './videos/'+newname+'.mp4')
  else:
    os.remove(newname)

  shutil.move(newname + '.mp3', './audio/'+newname + '.mp3')

def check_url(url, keep_vids, dir_name):

  if not os.path.exists(dir_name):
    os.makedirs(dir_name)

  parsed_url = urlparse.urlparse(url, keep_vids, dir_name)

  if hasattr(urlparse.parse_qs(parsed_url.query), 'list'):

    start_at=raw_input("Which number video should be first?\n")
    playlist_id = urlparse.parse_qs(parsed_url.query)['list']

    xml_url = 'http://gdata.youtube.com/feeds/api/playlists/' + playlist_id[0] + '?max-results=50&start-index=' + start_at

    request = urllib2.Request(xml_url, headers={"Accept" : "application/atom+xml"})

    playlist_data = urllib2.urlopen(request)

    tree = ET.parse(playlist_data)
    print tree
    #print list(tree.iter())
    rootElem = tree.getroot()

    # Change directory before beginning process
    os.chdir('./'+dir_name)

    for child in rootElem.findall("./{http://www.w3.org/2005/Atom}entry/{http://www.w3.org/2005/Atom}link/[@rel='alternate']"):
      video_objects = child.attrib
      url_to_get = video_objects['href'].split('&')[0]

      download(url_to_get, keep_vids, dir_name)

  else:
    download(url, keep_vids, dir_name)

url=raw_input("Enter the YouTube video or playlist url:\n")
keep=raw_input("Do you want to keep video files? (Y/N)\n")
files_dir=raw_input("What shall the containing folder be called?\n")

check_url(url, keep, files_dir)
