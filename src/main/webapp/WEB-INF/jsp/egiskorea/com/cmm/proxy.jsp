<%@page session="false"%>
<%@page import="java.net.*,java.io.*,java.util.*" %>
<%
    HttpURLConnection connection = null;
    InputStream istream = null;
    OutputStream ostream = null;
    InputStream ristream = null;
    OutputStream rostream = null;
    
    try {
        if(request.getParameter("url") != null && request.getParameter("url") != "") {
            
            String resourceUrlStr = request.getQueryString();                    
            Enumeration enu = request.getParameterNames();
            while(enu.hasMoreElements()) {
                String name = (String)enu.nextElement();
                if(name.equalsIgnoreCase("url") == false) {
                    resourceUrlStr = resourceUrlStr + "&" + name + "=" + request.getParameter(name);
                }
            }
            
            resourceUrlStr = resourceUrlStr.replaceAll("url=", "");
          /*   resourceUrlStr = resourceUrlStr.replaceAll("%26", "&"); 
            resourceUrlStr = resourceUrlStr.replaceAll("%2F", "/");
            resourceUrlStr = resourceUrlStr.replaceAll("%3A", ":");
            resourceUrlStr = resourceUrlStr.replaceAll("%3F", "?");
            resourceUrlStr = resourceUrlStr.replaceAll("%3D", "=");
            resourceUrlStr = resourceUrlStr.replaceAll("%2C", ",");  */
        	
    		resourceUrlStr = URLDecoder.decode(resourceUrlStr, "UTF-8");
        	
            
            URL resourceUrl = new URL(resourceUrlStr);
            //URL resourceUrl = new URL(request.getParameter("resourceUrl"));               
            connection = (HttpURLConnection)resourceUrl.openConnection();
            connection.setDoInput(true);
            connection.setRequestMethod(request.getMethod());
            response.setContentType(connection.getContentType());
            // what's this for
            out.clear();
            out = pageContext.pushBody();
            ristream = connection.getInputStream();
            rostream = response.getOutputStream();
            final int length = 5000;
            byte[] bytes = new byte[length];
            int bytesRead = 0;
            while ((bytesRead = ristream.read(bytes, 0, length)) > 0) {
                rostream.write(bytes, 0, bytesRead);
            }
        }
    } catch(Exception e) {
        response.setStatus(500);
        e.printStackTrace();
    } finally {
        if(istream != null) { istream.close(); }            
        if(ostream != null) { ostream.close(); }
        if(ristream != null) { ristream.close(); }
        if(rostream != null) { rostream.close(); }          
    }
%>