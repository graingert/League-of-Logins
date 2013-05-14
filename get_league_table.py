import sys
from getpass import getpass

import ldap
import ldap.resiter


class MyLDAPObject(ldap.ldapobject.LDAPObject, ldap.resiter.ResultProcessor):
    pass

con = MyLDAPObject("ldap://washington.ecs.soton.ac.uk")
con.set_option(ldap.OPT_X_TLS_DEMAND, True)
con.bind_s("CN=tag1g09,OU=UnderGrad,OU=ECSUsers,DC=ecs,DC=soton,DC=ac,DC=uk", getpass())

msg_id = con.search("OU=UnderGrad,OU=ECSUsers,DC=ecs,DC=soton,DC=ac,DC=uk", ldap.SCOPE_SUBTREE, "(&(ecsStatus=ug)(objectclass=User))", ["ecsEmail", "gecos", "logonCount"])

for res_type, res_data, res_msgid, res_controls in l.allresults(msg_id):
    for dn, entry in res_data:
        print dn, entry['objectClass']
