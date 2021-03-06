
public static void getProfile(String email,String userphoto,String name)
	{
		
		Connection conn =null;
		try {
		 
			conn=Mysqlconnection. getMySqlConnection("grabconn");
			 
			CallableStatement cstmt = conn.prepareCall("{ call sp_saveTamilData(?,?,?) }");
			cstmt.setString("demail",email);
			cstmt.setString("duserphoto", userphoto);
			cstmt.setString("dname",  name); 
			cstmt.executeQuery("SET NAMES 'UTF8'");
			cstmt.executeQuery("SET CHARACTER SET 'UTF8'");
			ResultSet rs=cstmt.executeQuery();
			while(rs.next())
			{
				if(rs.getString("ErrorCode").equals("9999"))
				{
					System.out.println("Added.");
					
				}
				else
					System.out.println("Already Added.");
			}
			
			if(rs!=null&&!rs.isClosed())
				rs.close();
			if(cstmt!=null&&!cstmt.isClosed())
				cstmt.close();
		}
		catch(Exception exp)
		{
			//logger.error(exp);
			System.out.print("Unable to save . Log"+exp.toString());
		}
		finally{
			try {
				
				
				if(conn!=null&&!conn.isClosed())
					conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		}

public static Connection getMySqlConnection(String config) throws Exception {
	    
		JsonObject jobj=JSON.strToJson( DocumentReader.AppData.get(config));
		
		String driver = "org.gjt.mm.mysql.Driver";
	    String url = "jdbc:mysql://"+jobj.get("ip").getAsString()+"/"+jobj.get("db").getAsString();
	    String username = jobj.get("username").getAsString();
	    String password = jobj.get("password").getAsString();

	    Class.forName(driver);
	    Connection conn = DriverManager.getConnection(url, username, password);
	    return conn;
	  }
